import cors from 'cors';
import express from 'express';

import accessEnv from '../helpers/accessEnv';

import setupRoutes from './routes';

const PORT = accessEnv('PORT', 7100);

const app = express(app);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

setupRoutes(app);

app.listen(PORT, () =>
  console.info(`Listing service listening on port ${PORT}`)
);
