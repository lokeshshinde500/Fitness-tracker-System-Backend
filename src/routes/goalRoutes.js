import { Router } from "express";
import {
  createGoal,
  deleteGoal,
  getGoal,
  getGoals,
  updateGoal,
} from "../controllers/goalController.js";
const routes = Router();

// create new goal
routes.post("/", createGoal);

// get all goals
routes.get("/", getGoals);

// get single goal by id
routes.get("/:id", getGoal);

// delete a goal by id
routes.delete("/:id", deleteGoal);

// update a goal by id
routes.patch("/:id", updateGoal);

export default routes;
