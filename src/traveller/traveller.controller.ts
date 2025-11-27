import { Controller ,Get,Post,Delete,Patch,Body,Param, Query, Redirect, UseInterceptors, UploadedFile} from '@nestjs/common';
import{TravellerService} from './traveller.service';
import { CreateUserDto } from './cretae_user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PdfvalidationpipePipe } from 'src/common/pipes/pdfvalidationpipe/pdfvalidationpipe.pipe';
import { ParseIntPipe } from '@nestjs/common';




@Controller('user')
export class TravellerController {

    constructor(private readonly travellerservice  :TravellerService){}

@Post('files')
@UseInterceptors(FileInterceptor('file'))
async create(@Body()createuserdto:CreateUserDto,@UploadedFile(new PdfvalidationpipePipe())file: Express.Multer.File){

 return await this.travellerservice.create(createuserdto,file.originalname);
}

@Post('add-ticket')
async ticketadder(@Body() body:{seatNo:number,price:number,id:number})
{
    return await this.travellerservice.createticket(
        body.seatNo,
        body.price,
        body.id
    );
}

@Post('passport')
async passportshower(@Body() body:{passportnumber:string,issuedate:string,id:number})
{
    return await this.travellerservice.passport(
        body.passportnumber,
        body.issuedate,
        body.id
    );
}

@Get()
async getalluser(){
    return await this.travellerservice.findall();

}

@Get('nullname')
async getnuller(){
    return await this.travellerservice.getnull();
}

@Get(':id')
async getbyid(@Param('id') id:number){


    return await this.travellerservice.findone(id);
}


 @Patch(':id')
async updatephone(@Param('id') id: number, @Body('phone') newphone:string) {
    const updated= await this.travellerservice.updatephone(id, newphone);
    return updated;
  }

 @Delete(':id')
async remove(@Param('id',ParseIntPipe) id: string) {
     await this.travellerservice.delete(id);
     return {message:'deleted'};
  }


@Get(':id/profile')
async profilepicture(@Param('id')id:number){
    const file = await this.travellerservice.profilepic(id);
    return file;
    
}

@Get(':id/pdf')
async pdffile(@Param('id')id:number){
     
const pdffile=  await this.travellerservice.pdfdoc(id); 
    return pdffile;
    


}


}