const AddTaskHours = require("../models/AddTaskHours");
const AssignProject = require("../models/AssignProject");
const ProjectTaskHours = require("../models/ProjectTaskHours");
const User = require("../models/User");
require("dotenv").config();

exports.editTaskAdded = async (updateTaskData) => {
  try {
    const { userId, idHoursData } = updateTaskData;
    const updatedProjectTaskHours = [];

    for (let i = 0; i < idHoursData.length; i++) {
      const { assignProjectId, hoursTaskData } = idHoursData[i];

      const isAssignedToProject = await AssignProject.findOne({
        _id: assignProjectId,
        developerId: userId,
      });

      if (!isAssignedToProject) {
        throw new Error("Not assigned to project");
      }

      for (let j = 0; j < hoursTaskData.length; j++) {
        const { date, hours } = hoursTaskData[j];

        // Find the corresponding ProjectTaskHours record
        const projectTaskHours = await ProjectTaskHours.findOne({
          assignProjectId: assignProjectId,
          "taskHours.date": date,
        });

        if (projectTaskHours) {
          // Update only the 'hours' field of the specific taskHour
          const taskHourToUpdate = projectTaskHours.taskHours.find(
            (taskHour) => taskHour.date === date
          );
          if (taskHourToUpdate) {
            taskHourToUpdate.hours = hours;
            console.log(
              `Hours updated for AssignProjectId ${assignProjectId}, Date: ${date}, New Hours: ${hours}`
            );
          }
        }
        await projectTaskHours.save();
        updatedProjectTaskHours.push(projectTaskHours);
      }
    }

    return updatedProjectTaskHours;
  } catch (error) {
    throw new Error(error.message);
  }
};
