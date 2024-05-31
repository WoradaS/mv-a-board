import {
    Column,
    Entity,
    PrimaryGeneratedColumn
} from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  blogID: number;

  @Column()
  userID: number;

  @Column()
  community: string;

  @Column()
  title: string;

  @Column()
  description: string;
}
