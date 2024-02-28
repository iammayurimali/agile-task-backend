const AddTaskHours = require("../models/AddTaskHours");
const AssignProject = require("../models/AssignProject");
const ProjectTaskHours = require("../models/ProjectTaskHours");
const User = require("../models/User");
require("dotenv").config();

exports.editTaskAdded = async (updateTaskData) => {
  try {
    const { userId, assignProjectId, date, day, hours, comments } =
      updateTaskData;
    const updatedProjectTaskHours = [];

    const isAssignedToProject = await AssignProject.findOne({
      _id: assignProjectId,
      developerId: userId,
    });

    if (!isAssignedToProject) {
      throw new Error("Not assigned to project");
    }

    const addTaskHours = await AddTaskHours.findOne({
      assignProjectId: assignProjectId,
      date: date,
    });

    if (!addTaskHours) {
      throw new Error("Task not found");
    }

    if (
      // userId !== addTaskHours.userId ||
      //assignProjectId !== addTaskHours.assignProjectId ||
      date !== addTaskHours.date ||
      day !== addTaskHours.day
    ) {
      throw new Error("Cannot update day, or date");
    }
    console.log(assignProjectId, addTaskHours.assignProjectId)
    addTaskHours.hours = hours;
    addTaskHours.comments = comments;

    const totalHoursForDate = await AddTaskHours.aggregate([
      {
        $match: {
          date: date,
          assignProjectId: { $ne: assignProjectId }, 
        },
      },
      {
        $group: {
          _id: null,
          totalHours: { $sum: "$hours" },
        },
      },
    ]);

    if (
      totalHoursForDate.length > 0 &&
      totalHoursForDate[0].totalHours + hours > 24
    ) {
      throw new Error(
        "Total hours for the date exceed 24 hours across projects"
      );
    }

  

    await addTaskHours.save();
    updatedProjectTaskHours.push(addTaskHours);

    return updateTaskData;
  } catch (error) {
    throw new Error(error.message);
  }
};
