import { ApolloServer } from 'apollo-server-express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';

import resolvers from '../graphql/resolvers';
import typeDefs from '../graphql/typeDefs';
import accessEnv from '../helpers/accessEnv';

const PORT = accessEnv('PORT', 7000);

const apolloSerrver = new ApolloServer({
  resolvers,
  typeDefs,
});

const app = express();

app.use(cookieParser());

app.use(cors());

apolloSerrver.applyMiddleware({ app, cors: false, path: '/graphql' });

app.listen(PORT, '0.0.0.0', () => {
  console.log(`API Gateway listening on ${PORT}`);
});
