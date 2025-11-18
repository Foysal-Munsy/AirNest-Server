import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { FilterPropertyDto } from './dto/filter-property.dto';
import { HostEntity, HostStatus } from './host.entity';
import { CreateHostDto } from './dto/create-host.dto';
import { UpdateHostStatusDto } from './dto/update-host-status.dto';
import { MoreThan, Repository } from 'typeorm';

@Injectable()
export class HostService {
  private dummyDatabase: any[] = []; 

    constructor(
    @InjectRepository(HostEntity)
    private readonly hostRepo: Repository<HostEntity>,
  ) {}

  
  async createHostUser(dto: CreateHostDto) {
    console.log('Service DTO:', dto);
    const host = this.hostRepo.create({
      fullName: dto.fullName,
      age: dto.age,
      
    });
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


  async findInactiveHosts() {
    return this.hostRepo.find({ where: { status: 'inactive' } });
  }

  
  async findHostsOlderThan40() {
    return this.hostRepo.find({
      where: { age: MoreThan(40) },
    });
  }

  createProperty(data: CreatePropertyDto) {

    const newProperty = { id: `prop-${Date.now()}`, ...data };
    this.dummyDatabase.push(newProperty);
    return { 
      status: 'success', 
      message: 'Property created successfully.', 
      data: newProperty 
    };
  }


  findAllProperties(filters: FilterPropertyDto) {

    return { 
      status: 'success', 
      message: 'All properties listed for host.', 
      filtersUsed: filters,
      count: this.dummyDatabase.length,
      properties: this.dummyDatabase
    };
  }


  findOneProperty(id: string) {
  
    const property = this.dummyDatabase.find(p => p.id === id);
    if (!property) throw new NotFoundException(`Property ID ${id} not found.`);
    
    return { 
      status: 'success', 
      message: 'Property details retrieved.', 
      data: property 
    };
  }


  updateFullProperty(id: string, data: UpdatePropertyDto) {

    return { 
      status: 'success', 
      message: `Property ID ${id} fully updated.`, 
      updatedData: data 
    };
  }

 
  updatePartialProperty(id: string, data: UpdatePropertyDto) {

    return { 
      status: 'success', 
      message: `Property ID ${id} partially updated.`, 
      updatedFields: data 
    };
  }


  findAllBookings(filters: FilterPropertyDto) {
    return { 
      status: 'success', 
      message: 'List of all bookings for host.',
      filtersUsed: filters 
    };
  }


  confirmBooking(id: string) {
    
    return { 
      status: 'success', 
      message: `Booking ID ${id} confirmed.`, 
      bookingId: id 
    };
  }


  deleteProperty(id: string) {

    return { 
      status: 'success', 
      message: `Property ID ${id} marked for deletion.` 
    };
  }
}