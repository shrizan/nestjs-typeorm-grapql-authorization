
import { Field } from "@nestjs/graphql";
import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
export class CoreEntity {

  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;
}