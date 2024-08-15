import express from "express";

export const router = express.Router();

router.route("/progress-business").post((req, res) => {
  const { fein, name } = req.body;
});
