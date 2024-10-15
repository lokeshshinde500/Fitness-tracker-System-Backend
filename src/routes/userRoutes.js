import { Router } from "express";
import workoutRoutes from "./workoutRoutes.js";
import goalRoutes from "./goalRoutes.js";
import {
  getFitnessPrograms,
  sinlgefitnessProgram,
} from "../controllers/adminController.js";
const routes = Router();

// for workout
routes.use("/workout", workoutRoutes);

// for goal
routes.use("/goal", goalRoutes);

// get all fitness Programs
routes.get("/fitnessProgram", getFitnessPrograms);

// get single fitness Program by id
routes.get("/fitnessProgram/:id", sinlgefitnessProgram);

export default routes;
