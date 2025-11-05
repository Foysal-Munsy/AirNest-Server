import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { HostService } from './host.service';
@Controller('host')
export class HostController {
    constructor(private readonly hostService: HostService) {}
   
    @Post('properties')
  createProperty(@Body() createPropertyDto: any) { 
    return this.hostService.createProperty(createPropertyDto);
  }

  @Get('properties')
  findAllProperties() {
    return this.hostService.findAllProperties();
  }

  @Get('properties/:id')
  findOneProperty(@Param('id') id: string) {
    return this.hostService.findOneProperty(id);
  }

 @Put('properties/:id')
  updateProperty(@Param('id') id: string, @Body() updatePropertyDto: any) {
    return this.hostService.updateProperty(id, updatePropertyDto);
  }

 @Delete('properties/:id')
  deleteProperty(@Param('id') id: string) {
    return this.hostService.deleteProperty(id);
  }

   @Get('bookings')
  findAllBookings() {
    return this.hostService.findAllBookings();
  }

  @Put('bookings/:id/confirm')
  confirmBooking(@Param('id') id: string) {
    return this.hostService.confirmBooking(id);
  }

 @Put('bookings/:id/reject')
  rejectBooking(@Param('id') id: string) {
    return this.hostService.rejectBooking(id);
  }
}