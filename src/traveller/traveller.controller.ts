import { Controller,Session ,Get,Post,Delete,Patch,Body,Param, UseInterceptors, UploadedFile, UseGuards,Request} from '@nestjs/common';
import{TravellerService} from './traveller.service';
import { CreateUserDto } from './cretae_user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { PdfvalidationpipePipe } from 'src/common/pipes/pdfvalidationpipe/pdfvalidationpipe.pipe';
import { ParseIntPipe } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
// import { SessionGuard } from 'src/GUARDS/session.guard';
import session from 'express-session';
import { AuthGuard } from '@nestjs/passport';


@Controller('user')
export class TravellerController {

    constructor(private readonly travellerservice  :TravellerService){}

// @Post('login')
// async login(@Body() body: any, @Session() session: Record<string, any>) {
//     const user = await this.travellerservice.login(body.email, body.password);
//     if (user === "User not found" || user === "Wrong password") {
//         throw new UnauthorizedException("Invalid credentials");
//     }
//     session.userid = user.id;
//     session.email = user.email;
//     return { message: "Login successful" };
// }

@Post('login')
async login(@Body() body:any){
    return await this.travellerservice.login(body.email,body.password)
}

@Get('my-profile')
@UseGuards(AuthGuard('jwt'))
// async checkSession(@Session() session: Record<string, any>) {
//     const user = await this.travellerservice.findone(session.userid);
//     return user;
// }
async getprofile(@Request() req:any){
    return await this.travellerservice.findone(req.user.userId)
}


@Post('logout')
// @UseGuards(SessionGuard)
// async logout(@Session() session: any) {
//     session.destroy();
//     return { message: "Logged out successfully" };
// }
async logout(){
    return {message:"logout successfully"};
}

@Post('files')
@UseInterceptors(FileInterceptor('file'))
async create(@Body()createuserdto:CreateUserDto,@UploadedFile(new PdfvalidationpipePipe())file: Express.Multer.File){

 return await this.travellerservice.create(createuserdto,file.originalname);
}

@Post('add-ticket')
@UseGuards(AuthGuard('jwt'))
async ticketadder(@Body() body:{seatNo:number,price:number} , // @Session() session: Record<string,any>
                               @Request() req:any)
{
       return await this.travellerservice.createticket(
        body.seatNo,
        body.price,
        req.user.id
    );
}

@Post('passport')
@UseGuards(AuthGuard('jwt'))

async passportshower(@Body() body:{passportnumber:string,issuedate:string},//@Session() session: Record<string,any>
                                @Request()req:any)
{
    return await this.travellerservice.passport(
        body.passportnumber,
        body.issuedate,
        req.user.id
    );
}

@Get()
@UseGuards(AuthGuard('jwt'))

async getalluser(){
    return await this.travellerservice.findall();

}

@Get('nullname')
@UseGuards(AuthGuard('jwt'))

async getnuller(){
    return await this.travellerservice.getnull();
}

@Get(':id')
@UseGuards(AuthGuard('jwt'))

async getbyid(@Param('id') id:number){


    return await this.travellerservice.findone(id);
}


 @Patch(':id')
@UseGuards(AuthGuard('jwt'))

async updatephone(@Param('id') id: number, @Body('phone') newphone:string) {
    const updated= await this.travellerservice.updatephone(id, newphone);
    return updated;
  }

 @Delete(':id')
@UseGuards(AuthGuard('jwt'))

async remove(@Param('id',ParseIntPipe) id: string) {
     await this.travellerservice.delete(id);
     return {message:'deleted'};
  }


@Get(':id/profilepic')
@UseGuards(AuthGuard('jwt'))

async profilepicture(@Param('id')id:number){
    const file = await this.travellerservice.profilepic(id);
    return file;
    
}

@Get(':id/pdf')
@UseGuards(AuthGuard('jwt'))

async pdffile(@Param('id')id:number){
     
const pdffile=  await this.travellerservice.pdfdoc(id); 
    return pdffile;
    


}


}
