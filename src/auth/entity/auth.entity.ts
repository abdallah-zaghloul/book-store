import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Exclude } from 'class-transformer';

@Entity()
export class Auth {
  @Exclude()
  @PrimaryColumn('uuid')
  accessId: string;

  @Column({
    type: 'text',
  })
  accessToken: string;

  @Exclude()
  @Column({
    type: 'jsonb',
    nullable: false,
  })
  persona: { userId: string };

  //computed user relation
  @Exclude()
  @Column({
    type: 'uuid',
    // nullable: true,
    generatedType: 'STORED',
    asExpression: `UUID(persona->>'userId')`,
  })
  userId: string;

  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  @OneToOne(() => User, (user) => user.auth)
  user: User;

  @Column({
    type: 'bigint',
  })
  expiresIn: number;

  @Column({
    type: 'timestamp',
  })
  expiredAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn({
    nullable: true,
  })
  refreshedAt: Date;
}
