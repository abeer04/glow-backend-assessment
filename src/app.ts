import bodyParser from "body-parser";
import express from "express";

export const app = express();
app.use(bodyParser.json());

import * as business from "./routes/buninessRoutes";
import * as workflow from "./routes/workflowRoutes";
import { Business } from "./controllers/businessController/types";

type Businesses = {
  [key: string]: Business;
};

export const businesses: Businesses = {};

app.use("/api/business", business);
app.use("/api/workflow", workflow);
