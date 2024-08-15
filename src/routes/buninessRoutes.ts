import express from "express";

import { createBusiness } from "../controllers/businessController/business";

const router = express.Router();

router.route("/create").post(createBusiness);

export default router;
