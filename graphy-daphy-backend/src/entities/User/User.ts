import 'reflect-metadata';
import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

// * type-graphql is interoperable, so we can use both typeorm Entity decorators alongside type-graphql Object type decorators
@ObjectType()
@Entity()
export default class User {
  // * we can define each field as we need with the proper typeorm decorator + the field decorator from type-graphql
  @Field()
  @PrimaryGeneratedColumn({ type: 'integer' })
  user_id!: number;

  @Field()
  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  username: string;

  @Field()
  @Column({ type: 'varchar', length: 3, nullable: true })
  user_age: string;
}
