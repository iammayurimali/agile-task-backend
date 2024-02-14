const AddTaskHours = require("../models/AddTaskHours");
const AssignProject = require("../models/AssignProject");
const User = require("../models/User");
require("dotenv").config();

exports.editTaskAdded = async (req, res) => {
  try {
    const { taskId,userId, taskhour } = req.body;

    // Check if the user is assigned to the task
    const isAssignedToTask = await AddTaskHours.exists({
      _id: taskId,
      userId: userId,
    });

    if (!isAssignedToTask) {
      return res.status(401).json({
        status: false,
        message: "User is not assigned to the specified task",
      });
    }

    const updatedTask = await AddTaskHours.findByIdAndUpdate(
      { _id: taskId },
      {
        taskHours: taskhour,
      },
      { new: true }
    );

    return res.status(200).json({
      status: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Error updating the task",
    });
  }
};
