import express from "express";
import ScoreController from "../controllers/scoreController.js";

const router = express.Router();

router
  .get("/score/", ScoreController.getScore)
  .get("/score/:name", ScoreController.getScoreByName)
  .post("/score", ScoreController.postScore)
  .put("/score/:id", ScoreController.updateScore)
  .delete("/score/:id", ScoreController.deleteScore)

export default router;   