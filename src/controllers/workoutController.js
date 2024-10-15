import workoutModel from "../models/workoutModel.js";

// create new workout
export const createWorkout = async (req, res) => {
  try {
    const { name, description, duration, sets, reps, caloriesBurn } = req.body;

    if (!name || !duration || !sets || !reps || !caloriesBurn) {
      return res.status(404).json({
        message: "All fields are required!",
        success: false,
      });
    }

    const newWorkout = {
      name,
      description: description,
      duration,
      sets,
      reps,
      caloriesBurn,
      created_by: req.user.id,
    };

    const createWorkout = await workoutModel.create(newWorkout);

    return res.status(201).json({
      message: "Workout created successfully.",
      workout: createWorkout,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error! Creat workout",
      error: error.message,
      success: false,
    });
  }
};

// get all workouts
export const getWorkouts = async (req, res) => {
  try {
    const workouts = await workoutModel.find({ created_by: req.user.id });

    if (!workouts) {
      return res.status(404).json({
        message: "workouts not found!",
        success: false,
      });
    }

    return res.status(200).json({
      workouts: workouts,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error! get workouts",
      error: error.message,
      success: false,
    });
  }
};

// get workout by id
export const getWorkout = async (req, res) => {
  try {
    const workout = await workoutModel.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        message: "workout not found!",
        success: false,
      });
    }

    return res.status(200).json({
      workout: workout,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error! get a workout",
      error: error.message,
      success: false,
    });
  }
};

// delete workout by id
export const deleteWorkout = async (req, res) => {
  try {
    const workout = await workoutModel.findByIdAndDelete(req.params.id);

    if (!workout) {
      return res.status(404).json({
        message: "workout not found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Workout deleted successfully.",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error! delete workout",
      error: error.message,
      success: false,
    });
  }
};

// update workout by id
export const updateWorkout = async (req, res) => {
  try {
    const workout = await workoutModel.findById(req.params.id);

    if (!workout) {
      return res.status(404).json({
        message: "workout not found!",
        success: false,
      });
    }

    const { name, description, duration, sets, reps, caloriesBurn } = req.body;

    workout.name = name || workout.name;
    workout.description = description || workout.description;
    workout.duration = duration || workout.duration;
    workout.sets = sets || workout.sets;
    workout.reps = reps || workout.reps;
    workout.caloriesBurn = caloriesBurn || workout.caloriesBurn;

    const updateWorkout = await workout.save({ new: true });

    return res.status(200).json({
      message: "Workout updated successfully.",
      workout: updateWorkout,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error! update workout",
      error: error.message,
      success: false,
    });
  }
};
