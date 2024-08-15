(request: Request, response: Response) => {
  const { fein } = request.params;
  const { industry, contact, status } = request.body;
  const business = businesses[fein];

  if (!business) {
    return response.status(404).json({ errorMessage: "Business not found." });
  }

  switch (business.currentStage) {
    case WorkflowStagesEnum.NEW:
      if (!industry) {
        return response
          .status(400)
          .json({ errorMessage: "Industry is required to progress." });
      }

      if (!Object.values(IndustryEnum).includes(industry)) {
        return response.status(400).json({
          errorMessage: `Target industry must be one of: ${Object.values(
            IndustryEnum
          ).join(", ")}.`,
        });
      }

      if ([IndustryEnum.RESTAURANTS, IndustryEnum.STORES].includes(industry)) {
        business.industry = industry;
        business.currentStage = WorkflowStagesEnum.MARKET_APPROVED;

        return response.json({
          business,
          nextStep: "Provide contact information to progress.",
        });
      } else {
        business.currentStage = WorkflowStagesEnum.MARKET_DECLINED;

        return response.json({ business });
      }
    case WorkflowStagesEnum.MARKET_APPROVED:
      if (!contact) {
        return response.status(400).json({
          errorMessage: "Contact is required.",
        });
      }

      if (!(contact.name && contact.phone)) {
        return response.status(400).json({
          errorMessage: "Valid contact comprises name and phone.",
        });
      }

      business.contact = contact;
      business.currentStage = WorkflowStagesEnum.SALES_APPROVED;

      return response.json({
        business,
        nextStep: "Choose Won or Lost to complete the workflow.",
      });
    case WorkflowStagesEnum.SALES_APPROVED:
      if (
        !status ||
        (status !== WorkflowStagesEnum.WON &&
          status !== WorkflowStagesEnum.LOST)
      ) {
        return response
          .status(400)
          .json({ errorMessage: "Status must be either 'Won' or 'Lost'." });
      }

      business.currentStage = status;

      return response.json({ business });
    default:
      return response
        .status(400)
        .json({ errorMessage: "No further progression possible." });
  }
};
