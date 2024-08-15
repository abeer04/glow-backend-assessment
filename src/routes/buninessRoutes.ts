import express from "express";

import { createBusiness } from "../controllers/businessController/business";

export const router = express.Router();

router.route("/create").post(createBusiness);
