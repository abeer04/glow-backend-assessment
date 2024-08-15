import { businesses } from "../../app";
import { Business, IndustryEnum } from "./types";
import { Response } from "express";

export const businessCreationChecks = (
  res: Response,
  { fein, name, industry, contact }: Business
) => {
  if (!fein || !name) {
    return res
      .status(400)
      .json({ errorMessage: "Missing required parameters" });
  }

  validateFein(res, fein);
  industry && validateIndustry(res, industry);
  Object.keys(contact || {}).length > 0 && validateContact(res, contact);

  if (businesses[fein]) {
    return res.status(400).json({
      res: "Business already exist against this fein",
    });
  }
};

export const validateFein = (res: Response, fein: string) => {
  if (isNaN(Number(fein)) || fein.toString().length !== 9) {
    return res
      .status(400)
      .json({ errorMessage: "fein must be a 9 digit number" });
  }
};

export const validateIndustry = (res: Response, industry: IndustryEnum) => {
  if (!Object.values(IndustryEnum).includes(industry)) {
    return res.status(400).json({
      errorMessage: "industry parameter missing or invalid",
    });
  }
};

export const validateContact = (res: Response, contact: any) => {
  if (!contact?.name || !contact?.phone) {
    return res.status(400).json({
      errorMessage: "Missing or Invalid contact information",
    });
  }
};
