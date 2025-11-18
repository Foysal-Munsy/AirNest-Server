import { NotFoundException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './cretae_user.dto';
import { UpdateUserDto } from './Update_user.dto';
import { Express } from 'express';
import { InjectRepository } from '@nestjs/typeorm';
import { TravellerEntity } from './traveller.entity';
import { Repository } from 'typeorm';
import { IsNull } from 'typeorm';

@Injectable()
export class TravellerService {


  constructor(@InjectRepository(TravellerEntity) private travellerrepo: Repository<TravellerEntity>){}
  async create(createuserdto:CreateUserDto,filename:string): Promise<TravellerEntity>
  {
    const newtraveller = this.travellerrepo.create({...createuserdto,pdfdoc:filename})
    return await this.travellerrepo.save(newtraveller);
  }
        


    async findall(): Promise<TravellerEntity[]>
    {
     return await this.travellerrepo.find()    
    }  
    
    async findone(id:number):Promise<TravellerEntity|null> 
    {
        return await this.travellerrepo.findOneBy({id:id});
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
