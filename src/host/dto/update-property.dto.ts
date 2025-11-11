import { PartialType } from '@nestjs/mapped-types';
import { CreatePropertyDto } from './create-property.dto';

export class UpdatePropertyDto  {
   title?:         string;
   description?:   string;
   address?:       string;
   pricePerNight?: number;
   bedrooms?:      number;
}