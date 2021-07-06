import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { createWithApollo } from "./apollo";
export const apolloClient: any = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    cache: new InMemoryCache({}),
  });

export const withApollo = createWithApollo(apolloClient);
