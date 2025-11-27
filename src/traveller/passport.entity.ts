import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { TravellerEntity } from "./traveller.entity";




@Entity()
export class Passport{

    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    passportnumber:String;

    @Column()
    issuedate: string;

    @OneToOne(()=>TravellerEntity, (traveller)=>traveller.passport)
    @JoinColumn()
    traveller:TravellerEntity;
}