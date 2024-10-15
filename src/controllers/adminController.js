import fitnessProgramModel from "../models/fitnessProgramModel.js";
import userModel from "../models/userModel.js";

// get all users (only users not admins)
export const getUsers = async (req, res) => {
  try {
    const users = await userModel.find({ role: "user" });

    if (!users) {
      return res.status(404).json({
        message: "Users not founds",
        success: false,
      });
    }

    return res.status(200).json({
      users: users,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error! get all users",
      error: error.message,
      success: false,
    });
  }
};

// get user by id
export const getUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
        success: false,
      });
    }

    return res.status(200).json({
      user: user,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error! get user",
      error: error.message,
      success: false,
    });
  }
};

// Create new fitness program
export const createFitnessProgram = async (req, res) => {
  try {
    const { name, description, duration, price } = req.body;

    if (!name || !description || !duration || !price) {
      return res.status(404).json({
        message: "All fields are required!",
        success: false,
      });
    }

    const newProgram = {
      name,
      description,
      duration,
      price,
      created_by: req.user.id,
    };

    const createProgram = await fitnessProgramModel.create(newProgram);

    return res.status(201).json({
      message: "Fitness program created successfully.",
      program: createProgram,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error! Create fitness program",
      error: error.message,
      success: false,
    });
  }
};

// get all fitness programs
export const getFitnessPrograms = async (req, res) => {
  try {
    const programs = await fitnessProgramModel.find();

    if (!programs) {
      return res.status(404).json({
        message: "Programs are not founds!",
        success: false,
      });
    }

    return res.status(200).json({
      programs: programs,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error! get all fitness programs",
      error: error.message,
      success: false,
    });
  }
};

// get all fitness programs for spacific admin
export const getAdminFitnessPrograms = async (req, res) => {
  try {
    const programs = await fitnessProgramModel.find({
      created_by: req.user.id,
    });

    if (!programs) {
      return res.status(404).json({
        message: "Programs are not founds!",
        success: false,
      });
    }

    return res.status(200).json({
      programs: programs,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error! get all fitness programs admin",
      error: error.message,
      success: false,
    });
  }
};

// get single fitness program
export const sinlgefitnessProgram = async (req, res) => {
  try {
    const program = await fitnessProgramModel.findById(req.params.id);

    if (!program) {
      return res.status(404).json({
        message: "fitness Program not found!",
        success: false,
      });
    }

    return res.status(200).json({
      program: program,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error! get fitness single ProgramModel",
      error: error.message,
      success: false,
    });
  }
};

// delete single fitness program
export const deletefitnessProgram = async (req, res) => {
  try {
    const program = await fitnessProgramModel.findByIdAndDelete(req.params.id);

    if (!program) {
      return res.status(404).json({
        message: "fitness Program not found!",
        success: false,
      });
    }

    return res.status(200).json({
      nessage: "Program deleted succesfully.",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error! get fitness single ProgramModel",
      error: error.message,
      success: false,
    });
  }
};

// update single fitness program by id
export const updatefitnessProgram = async (req, res) => {
  try {
    const program = await fitnessProgramModel.findById(req.params.id);

    if (!program) {
      return res.status(404).json({
        message: "fitness Program not found!",
        success: false,
      });
    }
    const { name, description, duration, price } = req.body;

    program.name = name || program.name;
    program.description = description || program.description;
    program.duration = duration || program.duration;
    program.price = price || program.price;

    const createProgram = await program.save({ new: true });

    return res.status(201).json({
      message: "Fitness program upadated successfully.",
      program: createProgram,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error! get fitness single ProgramModel",
      error: error.message,
      success: false,
    });
  }
};
