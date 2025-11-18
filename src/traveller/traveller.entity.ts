
import { Entity,Column,PrimaryColumn, BeforeInsert, Check } from "typeorm";

@Entity('traveller')
export class TravellerEntity{
    @PrimaryColumn()
    id :number;
      @BeforeInsert()
    generateid(){
        this.id = Math.floor(Math.random() *1000000);
    }

    @Column({default:true})
    isactive:boolean;
    @Column({type:'varchar',nullable:true})
    fullname:string;
    @Column()
    email:string;
    @Column()
    password:string;
    @Check('"phone" >= 0')
    @Column({type:'bigint'})
    phone:string;
    @Column({nullable:true})
    profilepic:string;
    @Column({nullable:true})
    pdfdoc:string;

  
}