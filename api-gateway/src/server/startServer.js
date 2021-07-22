import { ApolloServer } from "apollo-server-express";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

import resolvers from "../graphql/resolvers";
import typeDefs from "../graphql/typeDefs";
import accessEnv from "../helpers/accessEnv";

import formatGraphQLErrors from "./formatGraphQLErrors";
import injectSession from "./injectSession";

const PORT = accessEnv("PORT", 7000);

const apolloSerrver = new ApolloServer({
  context: (a) => a,
  formatError: formatGraphQLErrors,
  resolvers,
  typeDefs,
});

const app = express();

app.use(cookieParser());

var corsOptions = {
  origin: "http://localhost:7001",
  credentials: true, // <-- REQUIRED backend setting
};
app.use(cors(corsOptions));

// app.use(cors());

app.use(injectSession);

apolloSerrver.applyMiddleware({ app, cors: false, path: "/graphql" });

app.listen(PORT, "0.0.0.0", () => {
  console.log(`API Gateway listening on ${PORT}`);
});
