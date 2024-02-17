const AddTaskHours = require("../models/AddTaskHours");
const AssignProject = require("../models/AssignProject");
const User = require("../models/User");

exports.addCompletedTask = async (taskHour) => {
  try {
    const { userId, assignProjectID, taskHours } = taskHour;

    const user = await User.findById({ _id: userId });
    if (!user) {
      throw new Error("User not found");
    }

    const isAssignedToProject = await AssignProject.findOne({
      _id: assignProjectID,
      developerId: userId,
    });

    if (!isAssignedToProject) {
      throw new Error("User is not assigned to the specified project");
    }

    const currentDate = new Date().toLocaleString();

    const taskHoursWithDate = taskHours.map((taskHourInput) => ({
      date: currentDate,
      hours: taskHourInput.hours,
    }));

    const addTaskHours = await new AddTaskHours({
      assignProjectId:assignProjectID,
      taskHours: taskHoursWithDate,
    }).save();

    const updateProject = await AssignProject.findByIdAndUpdate(
      { _id: assignProjectID },
      { $push: { addTaskHours: addTaskHours._id } },
      { new: true }
    );

    return updateProject;
  } catch (error) {
    throw new Error(error.message);
  }
};
