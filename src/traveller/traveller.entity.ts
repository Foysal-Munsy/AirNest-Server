import { Entity,Column,PrimaryGeneratedColumn } from "typeorm";

@Entity('traveller')
export class TravellerEntity{
    @PrimaryGeneratedColumn()
    id:number;
    @Column()
    name:string;
    @Column()
    email:string;
    @Column()
    password:string;
    @Column()
    profilepic:string;
}