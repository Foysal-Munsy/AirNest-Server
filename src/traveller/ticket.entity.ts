import { TravellerEntity } from "src/traveller/traveller.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Ticket {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    seatNo: number;

    @Column()
    price:number;

    @ManyToOne(()=>TravellerEntity, (traveller)=> traveller.tickets)
    traveller: TravellerEntity;

}


