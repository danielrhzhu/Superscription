import { getModelForClass } from "@typegoose/typegoose";
import { MyContext } from "../types/MyContext";
import { auth } from "../utils/auth";
import {
  Arg,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Sub } from "../models/Sub";
import { ObjectId } from "mongoose";
import { SubInputs } from "../types/SubInputs";
import { PaginatedSubs } from "../types/PaginatedSubs";

const SubModel = getModelForClass(Sub);
@Resolver(Sub)
export class SubResolver {
  @Query(() => Sub)
  @UseMiddleware(auth)
  async findOneSub(
    @Arg("id", () => String) id: ObjectId,
    @Ctx() { req }: MyContext
  ): Promise<Sub | null> {
    const sub = await SubModel.findOne({ _id: id, userId: req.session.userId });
    // should not be null since we are providing the Id from the frontend.
    return sub;
  }

  @Mutation(() => Sub)
  @UseMiddleware(auth)
  async editSub(
    @Arg("id", () => String) id: ObjectId,
    @Arg("inputs", () => SubInputs, { nullable: true }) inputs: SubInputs,
    @Ctx() { req }: MyContext
  ): Promise<Sub | null> {
    const sub = await SubModel.findOneAndUpdate(
      { _id: id, userId: req.session.userId },
      { ...inputs },
      {
        returnOriginal: false,
      }
    );
    // returning null when another user attempts to access someone else's info.
    if (!sub) {
      return null;
    }

    return sub;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(auth)
  async deleteSub(
    @Arg("_id", () => String) _id: ObjectId,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    await SubModel.deleteOne({
      _id,
      userId: req.session.userId,
    });

    return true;
  }

  @Query(() => PaginatedSubs)
  @UseMiddleware(auth)
  async findSubs(
    @Arg("name", { nullable: true }) name: string,
    @Arg("limit", () => Int, { nullable: true }) limit: number,
    @Arg("offset", () => Int, { nullable: true }) offset: number,
    @Ctx() { req }: MyContext
  ): Promise<PaginatedSubs> {
    let limitCheck = limit + 1;

    const subs = await SubModel.find({
      userId: req.session.userId,
      name: { $regex: `(?i:${name})` },
    })
      .collation({ locale: "en" })
      .limit(limitCheck)
      .skip(offset)
      .sort({ name: 1 });

    return { subs: subs.slice(0, limit), more: subs.length > limit };
  }

  @Mutation(() => Sub)
  @UseMiddleware(auth)
  async createSub(
    @Arg("inputs") inputs: SubInputs,
    @Ctx() { req }: MyContext
  ): Promise<Sub> {
    let sub = await SubModel.create({
      userId: req.session.userId,
      ...inputs,
    });
    sub.save();

    return sub;
  }
}
