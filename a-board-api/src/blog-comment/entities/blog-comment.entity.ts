import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BlogComment {
  @PrimaryGeneratedColumn()
  blogCommentID: number;

  @Column()
  blogID: number;

  @Column()
  userID: number;

  @Column()
  comment: string;
}
