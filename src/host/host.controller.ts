import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { HostService } from './host.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { FilterPropertyDto } from './dto/filter-property.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserValidationPipe } from './pipes/user-validation.pipe';
import { CreateHostDto } from './dto/create-host.dto';
import { UpdateHostStatusDto } from './dto/update-host-status.dto';
import { CreateBookingDto } from './dto/create-booking.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateHostProfileDto } from './dto/update-host-profile.dto';

@Controller('host')
export class HostController {
  constructor(private readonly hostService: HostService) {}

  @Post('users')
  createHostUser(@Body() dto: CreateHostDto) {
    console.log('CreateHostDto from request:', dto);
    return this.hostService.createHostUser(dto);
  }

  @Patch('users/:id/status')
  @UseGuards(JwtAuthGuard)
  changeHostStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateHostStatusDto,
  ) {
    return this.hostService.changeHostStatus(id, dto);
  }

  @Get('users/:id/profile')
  @UseGuards(JwtAuthGuard)
  getHostProfile(@Param('id', ParseIntPipe) id: number) {
    return this.hostService.getHostProfile(id);
  }

  @Patch('users/:id/profile')
  @UseGuards(JwtAuthGuard)
  updateHostProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateHostProfileDto,
  ) {
    return this.hostService.updateHostProfile(id, dto);
  }

  @Get('users/inactive')
  @UseGuards(JwtAuthGuard)
  getInactiveHosts() {
    return this.hostService.findInactiveHosts();
  }

  @Get('users/older-than-40')
  @UseGuards(JwtAuthGuard)
  getOlderHosts() {
    return this.hostService.findHostsOlderThan40();
  }

  @Post('register')
  register(@Body(new UserValidationPipe()) body: CreateUserDto) {
    return { message: 'Registration payload is valid', data: body };
  }

  @Post('properties')
  @HttpCode(HttpStatus.CREATED)
  @UseGuards(JwtAuthGuard)
  createProperty(@Body() createPropertyDto: CreatePropertyDto) {
    return this.hostService.createProperty(createPropertyDto);
  }

  @Get('users/:id/properties')
  @UseGuards(JwtAuthGuard)
  listHostProperties(@Param('id', ParseIntPipe) id: number) {
    return this.hostService.findHostProperties(id);
  }

  @Get('properties')
  findAllProperties(@Query() filterDto: FilterPropertyDto) {
    return this.hostService.findAllProperties(filterDto);
  }

  @Get('properties/:id')
  findOneProperty(@Param('id') id: string) {
    return this.hostService.findOneProperty(id);
  }

  @Put('properties/:id')
  @UseGuards(JwtAuthGuard)
  updateFullProperty(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.hostService.updateFullProperty(id, updatePropertyDto);
  }

  @Patch('properties/:id')
  @UseGuards(JwtAuthGuard)
  updatePartialProperty(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
  ) {
    return this.hostService.updatePartialProperty(id, updatePropertyDto);
  }

  @Get('bookings')
  @UseGuards(JwtAuthGuard)
  findAllBookings() {
    return this.hostService.findAllBookings();
  }

  @Put('bookings/:id/confirm')
  @UseGuards(JwtAuthGuard)
  confirmBooking(@Param('id') id: string) {
    return this.hostService.confirmBooking(id);
  }

  @Post('properties/:propertyId/bookings')
  @UseGuards(JwtAuthGuard)
  createBooking(
    @Param('propertyId') propertyId: string,
    @Body() dto: CreateBookingDto,
  ) {
    return this.hostService.createBooking(propertyId, dto);
  }

  @Delete('properties/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(JwtAuthGuard)
  deleteProperty(@Param('id') id: string) {
    return this.hostService.deleteProperty(id);
  }
}
