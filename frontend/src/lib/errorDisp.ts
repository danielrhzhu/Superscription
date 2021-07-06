import { MyError } from "../generated/graphql";

export const errorDisp = (e: MyError[]) => {
  const errorDisp: Record<string, string> = {};
  e.forEach(({ field, message }) => {
    errorDisp[field] = message;
  });
  return errorDisp;
};
