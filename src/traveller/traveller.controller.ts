import { Controller ,Get,Post,Delete,Patch,Body,Param, Query, Redirect} from '@nestjs/common';
import{TravellerService} from './traveller.service';
import { CreateUserDto } from './cretae_user.dto';
import { UpdateUserDto } from './Update_user.dto';




@Controller('user')
export class TravellerController {

    constructor(private readonly travellerservice  :TravellerService){}

@Post()
create(@Body()createuserdto:CreateUserDto){

 return this.travellerservice.create(createuserdto);
}

@Get()
getalluser(){
    return this.travellerservice.findall();
}

@Get(':id')
getbyid(@Param('id') id:string){

    return this.travellerservice.findone(id);
}
@Get('search')
getbyname(@Query('name') name: string){
    return this.travellerservice.getname(name);
}

@Patch(':id')
update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.travellerservice.update(id, updateUserDto);
  }

@Delete(':id')
remove(@Param('id') id: string) {
    return this.travellerservice.delete(id);
  }


@Get(':id/profile')
@Redirect()
profilepicture(@Param('id')id:string){
    const pic = this.travellerservice.profilepic(id);
    return {url : pic};
}

}