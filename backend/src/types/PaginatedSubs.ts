import { Sub } from "../models/Sub";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class PaginatedSubs {
  @Field(() => [Sub])
  subs: Sub[];

  @Field()
  more: boolean;
}
