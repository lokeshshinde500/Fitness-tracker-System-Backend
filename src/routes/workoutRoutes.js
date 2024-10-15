import { Router } from "express";
import {
  createWorkout,
  deleteWorkout,
  getWorkout,
  getWorkouts,
  updateWorkout,
} from "../controllers/workoutController.js";
const routes = Router();

// create new workout plan
routes.post("/", createWorkout);

// get all workouts plan
routes.get("/", getWorkouts);

// get a workout plan
routes.get("/:id", getWorkout);

// delete workout plan
routes.delete("/:id", deleteWorkout);

// update workout plan
routes.patch("/:id", updateWorkout);

export default routes;
