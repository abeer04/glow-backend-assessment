import { Request, Response } from "express";
import { businesses } from "../../app";
import { WorkflowStagesEnum } from "./types";
import {
  pregressBusinessFromMarketApproved,
  progressBusinessFromNew,
  progressFromSalesApproved,
} from "./utils";
import { validateFein } from "../businessController/utils";

export const progressBusiness = (req: Request, res: Response) => {
  const { fein, industry, contact, status } = req.body;

  const notValidResponse = validateFein(res, fein);
  if (notValidResponse) return notValidResponse;

  const business = businesses[fein];

  if (!business) {
    return res.status(404).json({ errorMessage: "Business not found" });
  }

  switch (business.stage) {
    case WorkflowStagesEnum.NEW:
      return progressBusinessFromNew(res, industry, business);

    case WorkflowStagesEnum.MARKET_APPROVED:
      return pregressBusinessFromMarketApproved(res, contact, business);

    case WorkflowStagesEnum.SALES_APPROVED:
      return progressFromSalesApproved(res, status, business);

    default:
      return res.status(400).json({ errorMessage: "Invalid Workflow stage" });
  }
};
