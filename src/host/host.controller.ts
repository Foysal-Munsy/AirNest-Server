import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Query, HttpCode, HttpStatus } from '@nestjs/common';
import { HostService } from './host.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { FilterPropertyDto } from './dto/filter-property.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UserValidationPipe } from './pipes/user-validation.pipe';

@Controller('host') 
export class HostController {
  
  constructor(private readonly hostService: HostService) {}

 @Post('register')
  register(@Body(new UserValidationPipe()) body: CreateUserDto) 
  {
    return { message: 'Registration payload is valid', data: body };
  }

  @Post('properties')
  @HttpCode(HttpStatus.CREATED) 
  createProperty(@Body() createPropertyDto: CreatePropertyDto) 
  { 
    
    return this.hostService.createProperty(createPropertyDto);
  }

  
  @Get('properties')
  findAllProperties(@Query() filterDto: FilterPropertyDto) 
  {
   
    return this.hostService.findAllProperties(filterDto); 
  }

  
  @Get('properties/:id')
  findOneProperty(@Param('id') id: string) 
  {
   
    return this.hostService.findOneProperty(id);
  }


  @Put('properties/:id')
  updateFullProperty(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) 
  {
    return this.hostService.updateFullProperty(id, updatePropertyDto);
  }

  
  @Patch('properties/:id')
  updatePartialProperty(@Param('id') id: string, @Body() updatePropertyDto: UpdatePropertyDto) 
  {
    return this.hostService.updatePartialProperty(id, updatePropertyDto);
  }

  
  @Get('bookings')
  findAllBookings(@Query() filterDto: FilterPropertyDto) {
   
    return this.hostService.findAllBookings(filterDto);
  }

  
  @Put('bookings/:id/confirm')
  confirmBooking(@Param('id') id: string) {
   
    return this.hostService.confirmBooking(id);
  }

  
  @Delete('properties/:id')
  @HttpCode(HttpStatus.NO_CONTENT) 
  deleteProperty(@Param('id') id: string) {
    return this.hostService.deleteProperty(id);
  }
}