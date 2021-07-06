import { modelOptions, prop, Ref } from "@typegoose/typegoose";
import { ObjectId } from "mongoose";
import { Field, ObjectType } from "type-graphql";
import { Sub } from "./Sub";

@ObjectType()
@modelOptions({
  schemaOptions: {
    collection: "user",
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
})
export class User {
  @Field(() => String)
  public _id: ObjectId;

  @Field()
  @prop({ unique: true, required: true, useCreateIndex: true, autoIndex: true })
  public phonenumber!: string;

  @prop({ required: true })
  public password!: string;

  @Field(() => Sub)
  @prop({
    ref: () => Sub,
    default: [],
    foreignField: "userId",
    localField: "_id", // compare this to the foreign document's value defined in "foreignField"
    justOne: false,
  })
  public subscription: Ref<Sub>[];

  @Field()
  @prop({ default: () => Date.now() })
  createdAt: Date;

  @Field()
  @prop({ default: () => Date.now() })
  updatedAt: Date;
}
