import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { FilterPropertyDto, PropertySort } from './dto/filter-property.dto';
import { HostEntity } from './host.entity';
import { CreateHostDto } from './dto/create-host.dto';
import { UpdateHostStatusDto } from './dto/update-host-status.dto';
import { PropertyEntity } from './property.entity';
import { BookingEntity } from './booking.entity';
import { CreateBookingDto } from './dto/create-booking.dto';
import { HostProfileEntity } from './host-profile.entity';
import { UpdateHostProfileDto } from './dto/update-host-profile.dto';
import { MoreThan } from 'typeorm';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class HostService {
  constructor(
    @InjectRepository(HostEntity)
    private readonly hostRepo: Repository<HostEntity>,
    @InjectRepository(PropertyEntity)
    private readonly propertyRepo: Repository<PropertyEntity>,
    @InjectRepository(BookingEntity)
    private readonly bookingRepo: Repository<BookingEntity>,
    @InjectRepository(HostProfileEntity)
    private readonly profileRepo: Repository<HostProfileEntity>,
    private readonly mailer: MailerService,
  ) {}

  async createHostUser(dto: CreateHostDto) {
    const exists = await this.hostRepo.findOne({ where: { email: dto.email } });
    if (exists) {
      throw new ConflictException('Email already registered');

    }
    const salt = await bcrypt.genSalt();

    const passwordHash = await bcrypt.hash(dto.password,salt );

    const host = this.hostRepo.create({
      fullName: dto.fullName,
      email: dto.email,
      age: dto.age,
      passwordHash,
      status: 'inactive',
    });

    if (dto.phone || dto.bio) {
      const profile = this.profileRepo.create({
        phone: dto.phone ?? '',
        bio: dto.bio,
      });
      host.profile = profile;
    }

    return this.hostRepo.save(host);
  }

  async changeHostStatus(id: number, dto: UpdateHostStatusDto) {
    const host = await this.hostRepo.findOne({ where: { id } });
    if (!host) {
      throw new NotFoundException(`Host with id ${id} not found`);
    }
    host.status = dto.status;
    return this.hostRepo.save(host);
  }

  async updateHostProfile(hostId: number, dto: UpdateHostProfileDto) {
    const host = await this.hostRepo.findOne({
      where: { id: hostId },
      relations: ['profile'],
    });

    if (!host) throw new NotFoundException(`Host with id ${hostId} not found`);

    if (host.profile) {
      this.profileRepo.merge(host.profile, dto);
      await this.profileRepo.save(host.profile);
      return host.profile;
    }

    const profile = this.profileRepo.create({ ...dto, host });
    return this.profileRepo.save(profile);
  }

  async getHostProfile(hostId: number) {
    const host = await this.hostRepo.findOne({
      where: { id: hostId },
      relations: ['profile'],
    });
    if (!host) throw new NotFoundException(`Host with id ${hostId} not found`);
    return host.profile ?? null;
  }

  async findInactiveHosts() {
    return this.hostRepo.find({ where: { status: 'inactive' } });
  }

  async findHostsOlderThan40() {
    return this.hostRepo.find({
      where: { age: MoreThan(40) },
    });
  }

  async createProperty(data: CreatePropertyDto) {
    const host = await this.hostRepo.findOne({ where: { id: data.hostId } });
    if (!host) throw new NotFoundException(`Host ${data.hostId} not found`);

    const property = this.propertyRepo.create({
      ...data,
      host,
    });
    return this.propertyRepo.save(property);
  }

  async findAllProperties(filters: FilterPropertyDto) {
    const qb = this.propertyRepo
      .createQueryBuilder('property')
      .leftJoinAndSelect('property.host', 'host');

    if (filters.city) {
      qb.andWhere('LOWER(property.address) LIKE :city', {
        city: `%${filters.city.toLowerCase()}%`,
      });
    }

    if (filters.minPrice) {
      const minPrice = Number(filters.minPrice);
      if (Number.isNaN(minPrice)) {
        throw new BadRequestException('minPrice must be numeric');
      }
      qb.andWhere('property.pricePerNight >= :minPrice', { minPrice });
    }

    if (filters.sort === PropertySort.PRICE_ASC) {
      qb.orderBy('property.pricePerNight', 'ASC');
    } else if (filters.sort === PropertySort.PRICE_DESC) {
      qb.orderBy('property.pricePerNight', 'DESC');
    } else if (filters.sort === PropertySort.DATE_ADDED) {
      qb.orderBy('property.createdAt', 'DESC');
    }

    if (filters.limit) {
      const limit = Number(filters.limit);
      qb.take(Number.isNaN(limit) ? 10 : limit);
    }

    const properties = await qb.getMany();
    return { count: properties.length, properties };
  }

  async findHostProperties(hostId: number) {
    return this.propertyRepo.find({
      where: { host: { id: hostId } },
      relations: ['host'],
    });
  }

  async findOneProperty(id: string) {
    const property = await this.propertyRepo.findOne({
      where: { id },
      relations: ['host', 'bookings'],
    });
    if (!property) throw new NotFoundException(`Property ID ${id} not found.`);

    return property;
  }

  async updateFullProperty(id: string, data: UpdatePropertyDto) {
    const property = await this.propertyRepo.findOne({ where: { id } });
    if (!property) throw new NotFoundException(`Property ${id} not found`);

    this.propertyRepo.merge(property, data);
    return this.propertyRepo.save(property);
  }

  async updatePartialProperty(id: string, data: UpdatePropertyDto) {
    return this.updateFullProperty(id, data);
  }

  async deleteProperty(id: string) {
    const result = await this.propertyRepo.delete({ id });
    if (!result.affected) {
      throw new NotFoundException(`Property ID ${id} not found`);
    }
    return { status: 'success', message: `Property ID ${id} deleted.` };
  }

  async createBooking(propertyId: string, dto: CreateBookingDto) {
    const property = await this.propertyRepo.findOne({
      where: { id: propertyId },
      relations: ['host'],
    });
    if (!property)
      throw new NotFoundException(`Property ${propertyId} not found`);

    const booking = this.bookingRepo.create({
      ...dto,
      property,
      host: property.host,
    });
    return this.bookingRepo.save(booking);
  }

  async findAllBookings() {
    return this.bookingRepo.find({
      relations: ['property', 'host'],
    });
  }

  async confirmBooking(id: string) {
    const booking = await this.bookingRepo.findOne({
      where: { id },
      relations: ['property', 'host'],
    });
    if (!booking) throw new NotFoundException(`Booking ID ${id} not found.`);
    booking.status = 'confirmed';
    const saved = await this.bookingRepo.save(booking);

    if (booking.host?.email) {
      this.mailer.send({
        to: booking.host.email,
        subject: 'Booking confirmed',
        text: `Booking for ${booking.property.title} confirmed for ${booking.guestName}.`,
      });
    }

    return saved;
  }
}
