import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
    },
    sets: {
      type: Number,
      required: true,
    },
    reps: {
      type: Number,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    caloriesBurn: {
      type: String,
      required: true,
    },
    created_by: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const workoutModel = mongoose.model("Workout", workoutSchema);

export default workoutModel;
