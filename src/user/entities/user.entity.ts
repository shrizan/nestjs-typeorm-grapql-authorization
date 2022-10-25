import { ObjectType, Field, Int, InputType } from '@nestjs/graphql';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Entity, Column, BeforeInsert } from "typeorm";
import * as bcrypt from "bcrypt";

export type UserRole = 'ADMIN' | 'USER';

@ObjectType()
@Entity()
@InputType("UserInput", { isAbstract: true })
export class User extends CoreEntity {
  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  role: UserRole;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
  }

  async comparePassword(aPassword: string): Promise<boolean> {
    try {
      return await bcrypt.compare(aPassword, this.password);
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
