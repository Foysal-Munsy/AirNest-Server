import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { FilterPropertyDto } from './dto/filter-property.dto';
@Injectable()
export class HostService {
  private dummyDatabase: any[] = []; 


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