import { modelOptions, mongoose, prop, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";
import { Field, Float, Int, ObjectType } from "type-graphql";

import { User } from "./User";

@ObjectType()
@modelOptions({
  schemaOptions: {
    collection: "subscription",
  },
})
export class Sub {
  @Field(() => String)
  public _id!: ObjectId;

  @Field(() => User)
  @prop({ ref: () => User })
  public user!: Ref<User>;

  @Field(() => String)
  @prop({ type: mongoose.Schema.Types.ObjectId })
  public userId!: ObjectId;

  @Field()
  @prop({ required: true })
  public name!: string;

  @Field(() => Float, { nullable: true })
  @prop()
  public amount?: number;

  @Field({ nullable: true })
  @prop()
  public startDate?: string;

  @Field(() => Int, { nullable: true })
  @prop()
  public frequency?: number;

  @Field(() => String)
  @prop({ default: "linkedin" })
  public color: string;

  @Field(() => Boolean)
  @prop({ default: false })
  public notification: boolean;

  @Field()
  @prop({ default: () => Date.now() })
  createdAt: Date;

  @Field()
  @prop({ default: () => Date.now() })
  updatedAt: Date;
}
