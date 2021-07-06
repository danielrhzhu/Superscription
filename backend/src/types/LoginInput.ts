import { Field, InputType } from "type-graphql";

@InputType()
export class LoginInput {
  @Field()
  phonenumber: string;

  @Field()
  password: string;
}
