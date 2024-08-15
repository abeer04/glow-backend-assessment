import express from "express";
import { progressBusiness } from "../controllers/workflowController/workflow";

export const router = express.Router();

router.route("/progress-business").post(progressBusiness);

export default router;
