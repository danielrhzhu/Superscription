import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/MyContext";

export const auth: MiddlewareFn<MyContext> = ({ context }, next) => {
  if (!context.req.session.userId) {
    throw new Error("not authenticated");
  }
  return next();
};
