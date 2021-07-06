import "reflect-metadata";
import mongoose from "mongoose";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./resolvers/UserResolver";
import session from "express-session";
import cors from "cors";
import { SubResolver } from "./resolvers/SubResolver";
import connectRedis from "connect-redis";
import Redis from "ioredis";
import { smsSender } from "./utils/smsSender";
import "dotenv-safe/config";

const main = async () => {
  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  app.set("trust proxy", 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
  );
  app.use(
    session({
      name: "pis",
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 183,
        httpOnly: true,
        sameSite: "lax",
        secure: process.env.NODE_ENV === "production",
        domain:
          process.env.NODE_ENV === "production"
            ? ".superscription.me"
            : undefined,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET,
      resave: false,
    })
  );
  await mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true,
    })
    .then(() => console.log("connected to db"));
  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, SubResolver],
      validate: false,
    }),
    context: ({ req, res }) => ({ req, res, redis }),
  });
  console.log("hello");
  apolloServer.applyMiddleware({ app, cors: false });

  smsSender();
  app.listen(parseInt(process.env.PORT), () => {
    console.log("launched");
  });
};

main().catch((error) => {
  console.error(error);
});
