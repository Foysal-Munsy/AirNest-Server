import { NotFoundException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './cretae_user.dto';
import { UpdateUserDto } from './Update_user.dto';
import { Express } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { TravellerEntity } from './traveller.entity';
import { Repository } from 'typeorm';
import { IsNull } from 'typeorm';
import { Ticket } from './ticket.entity';
import { Passport } from './passport.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class TravellerService {


  constructor(@InjectRepository(TravellerEntity) private travellerrepo: Repository<TravellerEntity>,
              @InjectRepository(Ticket) private ticketrepo: Repository<Ticket>,
              @InjectRepository(Passport) private passportrepo: Repository<Passport>,
              private jwtService : JwtService){}
  async create(createuserdto:CreateUserDto,filename:string): Promise<TravellerEntity>
  {
    const salt = await  bcrypt.genSalt();
    const hashpass= await  bcrypt.hash(createuserdto.password,salt)
    const newtraveller = this.travellerrepo.create({...createuserdto,password:hashpass,pdfdoc:filename})
    return await this.travellerrepo.save(newtraveller);
  }


        async login(email: string, pass: string): Promise<{access_token:string}|string> {
    const user = await this.travellerrepo.findOneBy({ email: email });
    if (!user) {
        return "User not found"; 
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
        return "Wrong password";
    }
    const payload = {email:user.email,id:user.id}
    return  {access_token: this.jwtService.sign(payload)};
    }

        async findall(): Promise<TravellerEntity[]>
    {
     return await this.travellerrepo.find({
        relations:{ tickets:true,
                   passport:true},
     }) ;   
    }  
    
    async findone(id:number):Promise<TravellerEntity|null> 
    {
        return await this.travellerrepo.findOne({
            where:{
                id:id},
            relations:{tickets:true,
                passport:true
            },
        });
    }

    async createticket(seatNo:number,price:number,id:number): Promise<Ticket>
    {

        const newtraveller = await this.findone(id);
        if(!newtraveller)
            throw new NotFoundException("not found any traveller");


        const newticket = this.ticketrepo.create({

            seatNo:seatNo,
            price:price,
            traveller:newtraveller,
        });
        return await this.ticketrepo.save(newticket);
    }


    async passport(passportnumber:string,issuedate:string,id:number):Promise<Passport>
    {
          const newtraveller = await this.findone(id);
        if(!newtraveller)
            throw new NotFoundException("not found any traveller");
        
        const passport = this.passportrepo.create({
            passportnumber: passportnumber,
            issuedate:issuedate,
            traveller:newtraveller,

        });
        return await this.passportrepo.save(passport);
    }

    async getnull(): Promise<TravellerEntity[]>
    {
        return await this.travellerrepo.find({
            where: {
                fullname: IsNull(),
            },
        });
    }



   

    async updatephone(id:number, newphone:string) :Promise<TravellerEntity|null>
     {
        await this.travellerrepo.update(id,{phone:newphone})
        return await this.travellerrepo.findOneBy({id});
    }
        
   
   
    async delete(id:string):Promise<void>{

         await this.travellerrepo.delete(id);

            }

    
   async profilepic(id:number):Promise<string|null>
    {
        const user = await this.findone(id);

        if(!user){
            throw new NotFoundException('user not found');
        }

        if(!user.profilepic){
            throw  new NotFoundException('picture not found');

        }

        return user.profilepic;
    }


    async pdfdoc(id:number):Promise<string|null>
    {
        const user = await this.findone(id);

        if(!user){
            throw new NotFoundException('user not found');
        }

        

        return user.pdfdoc;
    }


    
}
