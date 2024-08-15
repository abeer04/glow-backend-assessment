import { Request, Response } from "express";
import { businesses } from "../../app";
import { Business } from "./types";
import { businessCreationChecks } from "./utils";
import { WorkflowStagesEnum } from "../workflowController/types";

export const createBusiness = async (req: Request, res: Response) => {
  const { fein, name, industry = null, contact = null } = req.body;

  const business: Business = {
    fein,
    name,
    industry,
    contact,
    stage: WorkflowStagesEnum.NEW,
  };

  const notValidResponse = businessCreationChecks(res, business);
  if (notValidResponse) return notValidResponse;

  businesses[business.fein] = business;

  res.status(201).json(business);
};
