const AddTask = require("../models/AddTask");
const AssignProject = require("../models/AssignProject");
const User = require("../models/User")
//const { options } = require("../routes/routes");
require("dotenv").config();

//signup route handler
exports.addCompletedTask = async (req, res) => {
  try {
    const { userId, project, date, taskdone, starttime, endtime } = req.body;

    const user = await User.findById({ _id: userId });
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found",
      });
    }
    const isAssignedToProject = await AssignProject.exists({
      userId: userId,
      assignedproject: project,
    });

    if (!isAssignedToProject) {
      return res.status(401).json({
        status: false,
        message: "User is not assigned to the specified project",
      });
    }
    const assignTask = new AddTask({
      userId,
      project,
      date,
      taskdone,
      starttime,
      endtime,
    })

    const saveCompletedTask = await assignTask.save();
    
    const updateUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { addTask: saveCompletedTask._id } },
      { new: true }
    )
      .populate("addTask")
      .exec();
    
    return res.status(200).json({
      status: true,
      message: 'Project assigned to user successfully',
      data: updateUser,
    });
    

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered, please try again later",
    });
  }
};
