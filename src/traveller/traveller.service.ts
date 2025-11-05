import { NotFoundException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './cretae_user.dto';
import { UpdateUserDto } from './Update_user.dto';
type user ={
     id: number;
     name : string;
    email: string;
    number: string;
    profilepic: string;
};

@Injectable()
export class TravellerService {

    private users: user[] = [];
    private counter = 1;
    create(createtraveller:CreateUserDto):user{
        const newuser: user = {id:this.counter++,...createtraveller};
        

        this.users.push(newuser)
        return newuser;}


    findall(){
        return this.users;
    }  
    
    findone(id:string){
        const Id= Number(id);
        return this.users.find((x)=>x.id === Id);
    }

    getname(name:string){

        return this.users.filter((x)=>x.name === name);
    }

    update(id: string, updateUserDto: UpdateUserDto) :user |undefined {
        const user = this.findone(id);
        if (!user) 
        return undefined;

        Object.assign(user, updateUserDto);
        return user;}
   
   
    delete(id:string){

        const user= this.users.find((x)=> x.id===Number(id));

        if(!user){
            return 'not found';
        }

        this.users= this.users.filter((x)=>x.id !==Number(id));
        return "remove done ";

    }
    
    profilepic(id:string)
    {
        const user = this.findone(id);

        if(!user){
            throw new NotFoundException('user not found');
        }

        if(!user.profilepic){
            throw new NotFoundException('picture not found');

        }

        return user.profilepic;
    }
}

    

