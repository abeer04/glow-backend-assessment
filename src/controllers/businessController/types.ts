import { WorkflowStagesEnum } from "../workflowController/types";

export enum IndustryEnum {
  RESTAURANT = "restaurant",
  STORE = "store",
  WHOLESALE = "wholesale",
  SERVICE = "service",
}

export type Contact = {
  name: string;
  phone: string;
};

export type Business = {
  fein: string;
  name: string;
  industry?: IndustryEnum;
  contact?: Contact;
  stage: WorkflowStagesEnum;
};
