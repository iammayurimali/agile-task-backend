const AddTaskHours = require("../models/AddTaskHours");
const AssignProject = require("../models/AssignProject");
const ProjectTaskHours = require("../models/ProjectTaskHours");
const User = require("../models/User");

exports.addCompletedTask = async (taskHoursData) => {
  try {
    const { userId, assignProjectId, date, day, hours, comments } =
      taskHoursData;

    const existingTask = await AddTaskHours.findOne({
      assignProjectId,
      date,
    });

    if (existingTask) {
      throw new Error("Task for the specified project and date already exists");
    }

    const isAssignedToProject = await AssignProject.findOne({
      _id: assignProjectId,
      developerId: userId,
    });

    if (!isAssignedToProject) {
      throw new Error("User is not assigned to the specified project");
    }

    const totalHoursForDay = await AddTaskHours.aggregate([
        {
          $match: {
            date,
            assignProjectId: { $ne: assignProjectId }, 
          },
        },
        {
          $group: {
            _id: null,
            total: { $sum: "$hours" },
          },
        },
      ]);
  
      const totalHoursInOtherProjects = totalHoursForDay.length > 0 ? totalHoursForDay[0].total : 0;
      const totalHoursIncludingCurrentProject = totalHoursInOtherProjects + hours;
  
      if (totalHoursIncludingCurrentProject > 24) {
        throw new Error("Total hours for the day across projects exceed 24");
      }

      
    const addTaskHours = await new AddTaskHours({
      assignProjectId: assignProjectId,
      date: date,
      day: day,
      hours: hours,
      comments: comments,
      totalWeekHours: null,
    }).save();

    const updateProject = await AssignProject.findByIdAndUpdate(
      { _id: assignProjectId },
      { $push: { addTaskHours: addTaskHours._id } },
      { new: true }
    );

    return addTaskHours;
  } catch (error) {
    throw new Error(error.message);
  }
};
