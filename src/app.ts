import express from "express";

export const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

import businessRoutes from "./routes/buninessRoutes";
import workflowRoutes from "./routes/workflowRoutes";
import { Business } from "./controllers/businessController/types";

type Businesses = {
  [key: string]: Business;
};

export const businesses: Businesses = {};

app.use("/api/business", businessRoutes);
app.use("/api/workflow", workflowRoutes);
