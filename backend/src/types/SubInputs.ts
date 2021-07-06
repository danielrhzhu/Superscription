import { Field, InputType } from "type-graphql";

@InputType()
export class SubInputs {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  amount?: number;

  @Field({ nullable: true })
  startDate?: string;

  @Field({ nullable: true })
  frequency?: number;

  @Field({ nullable: true })
  color?: string;

  @Field({ nullable: true })
  notification?: boolean;
}
