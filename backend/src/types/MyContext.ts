import { Request, Response } from "express";
import { Session, SessionData } from "express-session";
import { ObjectId } from "mongoose";
import { Redis } from "ioredis";

export type MyContext = {
  req: Request & {
    session: Session & Partial<SessionData> & { userId?: ObjectId };
  };
  res: Response;
  redis: Redis;
};
