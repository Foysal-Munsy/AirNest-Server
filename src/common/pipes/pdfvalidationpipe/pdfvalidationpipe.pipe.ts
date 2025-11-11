import { ArgumentMetadata, Injectable, PipeTransform,BadRequestException } from '@nestjs/common';
import { Express } from 'express';

@Injectable()
export class PdfvalidationpipePipe implements PipeTransform {
  transform(value: Express.Multer.File, metadata: ArgumentMetadata) {

    if(!value)
    {throw new BadRequestException('file required')}

    const mvalue= 'application/pdf';
    if(value.mimetype !== mvalue)
    {throw new BadRequestException('only pdf file allowed')}

    const size = 500*1024;
    if(value.size > size)
    {throw new BadRequestException('file limit reached')}
    
    return value;
  }
}
