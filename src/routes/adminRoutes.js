import { Router } from "express";
import {
  createFitnessProgram,
  deletefitnessProgram,
  getAdminFitnessPrograms,
  getFitnessPrograms,
  getUser,
  getUsers,
  sinlgefitnessProgram,
  updatefitnessProgram,
} from "../controllers/adminController.js";
const routes = Router();

// admin functionality

// get all users - only user not admin
routes.get("/users", getUsers);

// get single user by id
routes.get("/:id/user", getUser);

// Create fitness program
routes.post("/fitnessProgram", createFitnessProgram);

// view all fitness programs
routes.get("/fitnessProgram", getFitnessPrograms);

// view admins fitness programs
routes.get("/fitnessProgram/admin", getAdminFitnessPrograms);

// view single program
routes.get("/:id/fitnessProgram", sinlgefitnessProgram);

// delete program by id
routes.delete("/:id/fitnessProgram", deletefitnessProgram);

// update program by id
routes.patch("/:id/fitnessProgram", updatefitnessProgram);

export default routes;
