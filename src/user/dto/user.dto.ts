import { Field, InputType, ObjectType, PickType } from "@nestjs/graphql";
import { APIOutput } from "src/common/dtos/Core-Output.dto";
import { User } from "../entities/user.entity";

@ObjectType()
export class LoginOutputDTO extends APIOutput {
  @Field({ nullable: true })
  result?: string;
}

@InputType()
export class LoginInput extends PickType(User, ["email", "password"], InputType) { }