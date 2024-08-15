import { Request, Response } from "express";
import { businesses } from "../../app";
import { WorkflowStagesEnum } from "../workflowController/types";
import { Business, IndustryEnum } from "./types";

export const createBusiness = async (req: Request, res: Response) => {
  const { fein, name, industry = null, contact = null } = req.body;

  if (!fein || !name) {
    return res
      .status(400)
      .json({ errorMessage: "Missing required parameters" });
  }
  if (isNaN(fein) || fein.toString().length !== 9) {
    return res
      .status(400)
      .json({ errorMessage: "Fein must be a 9-digit number." });
  }

  if (industry && !Object.values(IndustryEnum).includes(industry)) {
  }

  if (businesses[fein]) {
    return res.status(400).json({
      res: "Business already exist against this fein number.",
    });
  }

  const business: Business = {
    fein,
    name,
    stage: WorkflowStagesEnum.NEW,
    industry,
    contact,
  };

  businesses[business.fein] = business;

  res.status(201).json(business);
};
