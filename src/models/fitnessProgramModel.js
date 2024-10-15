import mongoose from "mongoose";

const fitnessProgramSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    duration: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
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

const fitnessProgramModel = mongoose.model(
  "fitnessProgram",
  fitnessProgramSchema
);

export default fitnessProgramModel;
