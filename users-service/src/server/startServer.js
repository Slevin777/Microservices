import cors from "cors";
import express from "express";

import accessEnv from "../helpers/accessEnv";

import setupRoutes from "./routes";

const PORT = accessEnv("PORT", 7101);

const app = express(app);

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());

setupRoutes(app);

app.use((err, req, res, next) => {
  return res.status(500).json({
    message: err.message,
  });
});

app.listen(PORT, () => console.info(`Users service listening on port ${PORT}`));
