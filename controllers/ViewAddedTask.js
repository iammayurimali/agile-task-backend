const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const AddTask = require("../models/AddTask");
// const { options } = require("../routes/routes");
require("dotenv").config();

// viewAddedTask route handler
exports.viewAddedTask = async (req, res) => {
  try {
    const id = req.params.id;

    // Find the user by ID
    const user = await User.findById({_id:id}).populate("addTask");

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    if(user.addTask.length === 0){
        return res.status(404).json({
            status: false,
            message:"No Task Added"
        })
    }
    return res.status(200).json({
      status: true,
      message: "User's tasks retrieved successfully",
      data: user.addTask,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Error retrieving user's tasks",
    });
  }
};


exports.viewTaskByDate = async (req, res) => {
    try {
        const date = req.params.date;

        // Find tasks for the specified date
        const tasks = await AddTask.find({ date });

        if (!tasks || tasks.length === 0) {
            return res.status(404).json({
                status: false,
                message: "No tasks found for the specified date",
            });
        }

        return res.status(200).json({
            status: true,
            message: "Tasks retrieved successfully",
            data: tasks,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            status: false,
            message: "Error retrieving tasks",
        });
    }
};