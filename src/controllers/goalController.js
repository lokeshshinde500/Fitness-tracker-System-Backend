import goalModel from "../models/goalModel.js";

// create new goal
export const createGoal = async (req, res) => {
  try {
    const {
      name,
      description,
      goalType,
      progress,
      status,
      startDate,
      endDate,
    } = req.body;

    if (!name || !goalType || !startDate || !endDate) {
      return res.status(404).json({
        message: "All fields are required!",
        success: false,
      });
    }

    const newGoal = {
      name,
      description: description,
      goalType,
      progress: progress,
      status: status,
      startDate,
      endDate,
      created_by: req.user.id,
    };

    const createGoal = await goalModel.create(newGoal);

    return res.status(201).json({
      message: "goal created successfully.",
      goal: createGoal,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error! Creat goal",
      error: error.message,
      success: false,
    });
  }
};

// get all Goals
export const getGoals = async (req, res) => {
  try {
    const goals = await goalModel.find({ created_by: req.user.id });

    if (!goals) {
      return res.status(404).json({
        message: "goals not found!",
        success: false,
      });
    }

    return res.status(200).json({
      goals: goals,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error! get goals",
      error: error.message,
      success: false,
    });
  }
};

// get goal by id
export const getGoal = async (req, res) => {
  try {
    const goal = await goalModel.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        message: "goal not found!",
        success: false,
      });
    }

    return res.status(200).json({
      goal: goal,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error! get a goal",
      error: error.message,
      success: false,
    });
  }
};

// delete goal by id
export const deleteGoal = async (req, res) => {
  try {
    const goal = await goalModel.findByIdAndDelete(req.params.id);

    if (!goal) {
      return res.status(404).json({
        message: "goal not found!",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Goal deleted successfully.",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error! delete goal",
      error: error.message,
      success: false,
    });
  }
};

// update goal by id
export const updateGoal = async (req, res) => {
  try {
    const goal = await goalModel.findById(req.params.id);

    if (!goal) {
      return res.status(404).json({
        message: "goal not found!",
        success: false,
      });
    }

    const {
      name,
      description,
      goalType,
      progress,
      status,
      startDate,
      endDate,
    } = req.body;

    goal.name = name || goal.name;
    goal.description = description || goal.description;
    goal.goalType = goalType || goal.goalType;
    goal.progress = progress || goal.progress;
    goal.status = status || goal.status;
    goal.startDate = startDate || goal.startDate;
    goal.endDate = endDate || goal.endDate;

    const updateGoal = await goal.save({ new: true });

    return res.status(200).json({
      message: "Goal updated successfully.",
      goal: updateGoal,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error! update Goal",
      error: error.message,
      success: false,
    });
  }
};
