import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class APIOutput {
  @Field(() => String, { nullable: true, defaultValue: "Error occurred!!!" })
  error?: string;

  @Field(() => String, { nullable: true, defaultValue: 'Action completed successfully!!!' })
  msg?: string;

  @Field(() => Boolean)
  ok: boolean;
}