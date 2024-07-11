import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Author } from './author.entity';
import { Genre } from './genre.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'timestamp',
  })
  publicationDate: Date;

  @Column({
    type: 'uuid',
  })
  authorId: string;

  @Column({
    type: 'uuid',
  })
  genreId: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Author, (author) => author.books, { eager: true })
  @JoinColumn({ name: 'authorId', referencedColumnName: 'id' })
  author: Author;

  @ManyToOne(() => Genre, (genre) => genre.books, { eager: true })
  @JoinColumn({ name: 'genreId', referencedColumnName: 'id' })
  genre: Genre;
}
