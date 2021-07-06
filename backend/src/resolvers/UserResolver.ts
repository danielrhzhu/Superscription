import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { User } from "../models/User";
import argon2 from "argon2";
import { getModelForClass } from "@typegoose/typegoose";
import { MyContext } from "../types/MyContext";
import { auth } from "../utils/auth";
import { UserResponse } from "../types/UserResponse";
import { LoginInput } from "../types/LoginInput";

const UserModel = getModelForClass(User);

@Resolver(User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext): Promise<User | null> {
    if (!req.session.userId) {
      return null;
    }

    const user = await UserModel.findById(req.session.userId);

    return user;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(auth)
  async logout(@Ctx() { req, res }: MyContext): Promise<Boolean> {
    return new Promise((resolve) => {
      req.session.destroy((error) => {
        res.clearCookie("pis");
        if (error) {
          resolve(false);
          return;
        }
        resolve(true);
      });
    });
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("inputs") inputs: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await UserModel.findOne({ phonenumber: inputs.phonenumber });
    if (!user) {
      return {
        errors: [
          {
            field: "phonenumber",
            message: "invalid login attempt",
          },
        ],
      };
    }
    const valid = await argon2.verify(user.password, inputs.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "invalid login attempt",
          },
        ],
      };
    }

    req.session.userId = user._id;
    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("inputs") inputs: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    if (inputs.phonenumber.length !== 10) {
      return {
        errors: [
          {
            field: "phonenumber",
            message: "invalid phone number",
          },
        ],
      };
    }

    if (inputs.password.length <= 8) {
      return {
        errors: [
          {
            field: "password",
            message: "length must be greater than 8",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(inputs.password);
    let user;
    try {
      user = await UserModel.create({
        phonenumber: inputs.phonenumber,
        password: hashedPassword,
      });
      await user.save();
    } catch (e) {
      if (e.code === 11000) {
        return {
          errors: [
            {
              field: "phonenumber",
              message: "there is already an account registered to this #.",
            },
          ],
        };
      }
    }

    if (!user) {
      return {
        errors: [
          {
            field: "phonenumber",
            message: "impossible (just for type safety)",
          },
        ],
      };
    }

    req.session.userId = user._id;

    return { user };
  }
}
