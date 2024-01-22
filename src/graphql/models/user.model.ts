import { Field, Int, ObjectType } from '@nestjs/graphql';
import { UserSettings } from './user-settings.model';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'users' })
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  username: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  displayName?: string;

  @OneToOne(() => UserSettings)
  @JoinColumn()
  @Field({ nullable: true })
  settings?: UserSettings;
}
