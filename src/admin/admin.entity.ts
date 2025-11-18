import { Entity, Column, PrimaryColumn, BeforeInsert } from 'typeorm';
@Entity()
export class AdminEntity {
  @PrimaryColumn()
  id: number;

  @Column({ length: 100, unique: true })
  username: string;

  @Column({ length: 150 })
  fullname: string;

  @Column({ default: false })
  isActive: boolean;

  @BeforeInsert()
  generateId() {
    this.id = Math.floor(Math.random() * 1000);
  }
}
