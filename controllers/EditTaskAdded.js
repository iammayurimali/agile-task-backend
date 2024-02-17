const AddTaskHours = require("../models/AddTaskHours");
const AssignProject = require("../models/AssignProject");
const User = require("../models/User");
require("dotenv").config();

exports.editTaskAdded = async (editTask) => {
  try {
    const { projectID,taskId, taskhour } = editTask;

    const isAssignedToTask = await AddTaskHours.exists({
      _id: taskId,
      assignProjectId: projectID,
    });

    if (!isAssignedToTask) {
      throw new Error("Project is not assigned to the specified task")
    }

    const updatedTask = await AddTaskHours.findByIdAndUpdate(
      { _id: taskId },
      {
        taskHours: taskhour,
      },
      { new: true }
    );
   
    return updatedTask
  } catch (error) {
    console.error(error);
    return "error while updating task"
  }
};
