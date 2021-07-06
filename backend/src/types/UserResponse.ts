import { User } from "../models/User";
import { Field, ObjectType } from "type-graphql";
import { MyError } from "./MyError";

@ObjectType()
export class UserResponse {
  @Field(() => [MyError], { nullable: true })
  errors?: MyError[];

  @Field(() => User, { nullable: true })
  user?: User;
}
