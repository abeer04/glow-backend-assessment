import { Business, Contact, IndustryEnum } from "../businessController/types";
import { validateContact, validateIndustry } from "../businessController/utils";
import { WorkflowStagesEnum } from "./types";
import { Response } from "express";

export const progressBusinessFromNew = (
  res: Response,
  industry: IndustryEnum,
  business: Business
) => {
  const notValidResponse = validateIndustry(res, business.industry || industry);
  if (notValidResponse) return notValidResponse;

  if (!business.industry) {
    business.industry = industry;
  } else if (business.industry !== industry) {
    return res.status(400).json({
      errorMessage: "Industry cannot be changed",
    });
  }

  if ([IndustryEnum.RESTAURANT, IndustryEnum.STORE].includes(industry)) {
    business.stage = WorkflowStagesEnum.MARKET_APPROVED;

    return res.json({
      nextStepInfromation: nextStepInfromation(business.stage),
    });
  } else {
    business.stage = WorkflowStagesEnum.MARKET_DECLINED;
    return res.json({
      nextStepInfromation: nextStepInfromation(business.stage),
    });
  }
};

export const pregressBusinessFromMarketApproved = (
  res: Response,
  contact: Contact,
  business: Business
) => {
  const notValidResponse = validateContact(res, contact);
  if (notValidResponse) return notValidResponse;

  business.contact = contact;

  business.stage = WorkflowStagesEnum.SALES_APPROVED;

  return res.json({
    nextStepInfromation: nextStepInfromation(business.stage),
  });
};

export const progressFromSalesApproved = (
  res: Response,
  dealStatus: WorkflowStagesEnum.WON | WorkflowStagesEnum.LOST,
  business: Business
) => {
  if (
    !dealStatus ||
    ![WorkflowStagesEnum.WON, WorkflowStagesEnum.LOST].includes(dealStatus)
  ) {
    return res.status(400).json({ errorMessage: "Missing or invalid Status" });
  }

  business.stage = dealStatus;

  return res.json({ nextStepInfromation: nextStepInfromation(business.stage) });
};

const nextStepInfromation = (stage: WorkflowStagesEnum) => {
  switch (stage) {
    case WorkflowStagesEnum.NEW:
      return "Next Step: Industry required to progress the workflow to Market Approved or Market Declined";
    case WorkflowStagesEnum.MARKET_APPROVED:
      return "Next Step: contact information required to progress the workflow to Sales Approved";
    case WorkflowStagesEnum.SALES_APPROVED:
      return "Next Step: Business deal status Won or Lost required to complete the workflow";

    case WorkflowStagesEnum.MARKET_DECLINED:
    case WorkflowStagesEnum.WON:
    case WorkflowStagesEnum.LOST:
      return "No further steps required. Workflow completed.";

    default:
      return "Invalid Workflow stage";
  }
};
