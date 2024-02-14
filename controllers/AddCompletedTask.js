const AddTaskHours = require("../models/AddTaskHours");
const AssignProject = require("../models/AssignProject");
const User = require("../models/User");


exports.addCompletedTask = async (req, res) => {
  try {
    const { userId, assignProjectId, date, taskHours } = req.body;

    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found",
      });
    }

    const isAssignedToProject = await AssignProject.findOne({
      _id: assignProjectId,
      userId: userId,
    });

    if (!isAssignedToProject) {
      return res.status(401).json({
        status: false,
        message: "User is not assigned to the specified project",
      });
    }

    // Check if the same date data already exists for the project
    const existingTask = await AddTaskHours.findOne({
      userId,
      assignProjectId,
      date,
    });

    if (existingTask) {
      return res.status(400).json({
        status: false,
        message: "Task for the same date and project already exists",
      });
    }

    const addTaskHours = new AddTaskHours({
      userId,
      assignProjectId,
      date,
      taskHours,
    });

    const saveCompletedTask = await addTaskHours.save();

    const updateProject = await AssignProject.findByIdAndUpdate(
      { _id: assignProjectId },
      { $push: { addTaskHours: saveCompletedTask._id } },
      { new: true }
    ).populate("addTaskHours").exec();

    const updateUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { addTaskHours: saveCompletedTask._id } },
      { new: true }
    ).populate("addTaskHours").exec();

    return res.status(200).json({
      status: true,
      message: "Task added successfully",
      data:updateProject
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Not able to add task hours",
    });
  }
};
