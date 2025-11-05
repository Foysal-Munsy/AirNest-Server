import { Injectable } from '@nestjs/common';

@Injectable()
export class HostService {
createProperty(data: any) {
  return { message: 'Property created successfully', data };
  }
  findAllProperties() {
   return { message: 'List of all properties by this Host' };
  }
  findOneProperty(id: string) {
  return { message: 'Details of property ID: ${id}' };
  }
  updateProperty(id: string, data: any) {
  return { message: 'Property ID ${id} updated', data };
  }
  deleteProperty(id: string) {
    return { message: 'Property ID ${id} deleted' };
  }
 findAllBookings() {
     return { message: 'List of all bookings for this Host' };
  }
confirmBooking(id: string) {
   
    return { message: 'Booking ID ${id} confirmed' };
  }
rejectBooking(id: string) {
  
    return { message: 'Booking ID ${id} rejected' };
  }
}
