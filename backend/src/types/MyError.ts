import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class MyError {
  @Field()
  field: string;

  @Field()
  message: string;
}
