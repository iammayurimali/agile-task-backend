const AddTaskHours = require("../models/AddTaskHours");
const AssignProject = require("../models/AssignProject");
const ProjectTaskHours = require("../models/ProjectTaskHours");
const User = require("../models/User");

exports.addCompletedTask = async (taskHoursData) => {
  try {
      const { userId, startdate, enddate, idHoursData } = taskHoursData;

      for (let i = 0; i < idHoursData.length; i++) {
          const { assignProjectId, hoursTaskData } = idHoursData[i];

         // console.log("AssignProjectId:", assignProjectId);
        
          const isAssignedToProject = await AssignProject.findOne({
              _id: assignProjectId,
              developerId: userId,
          });

          if (!isAssignedToProject) {
              throw new Error("User is not assigned to the specified project");
          }

          const existingAddTaskHours = await AddTaskHours.findOne({
            startdate: startdate,
            enddate: enddate,
        });

        if (existingAddTaskHours) {
            const existingProjectTaskHours = await ProjectTaskHours.findOne({
                assignProjectId: assignProjectId,
                //'taskHours.date': { $gte: startdate, $lte: enddate },
            });

            if (existingProjectTaskHours) {
                console.log(`Data already exists for AssignProjectId ${assignProjectId}, StartDate: ${startdate}, EndDate: ${enddate}. Skipping.`);
                continue;
            }
        }
        //  console.log("CHECK>>>>>>>>>>>>>>>>>>>>>>>",existingProjectTaskHours)
          const taskHoursWithDate = hoursTaskData.map((taskHourInput) => ({
              day: taskHourInput.day,
              date: taskHourInput.date,
              hours: taskHourInput.hours,
          }));

          const projectTaskHours = await new ProjectTaskHours({
              assignProjectId: assignProjectId,
              taskHours: taskHoursWithDate,
          }).save();

          const addTaskHours = await new AddTaskHours({
              startdate: startdate,
              enddate: enddate,
              projectTaskHoursDetails: [projectTaskHours._id],
          }).save();

          const updateProject = await AssignProject.findByIdAndUpdate(
              { _id: assignProjectId },
              { $push: { addTaskHours: addTaskHours._id } },
              { new: true }
          );
          //console.log("Final data:", addTaskHours)
      }
      
      return taskHoursData;
  } catch (error) {
      throw new Error(error.message);
  }
};

