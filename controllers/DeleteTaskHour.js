const AssignProject = require("../models/AssignProject");
const AddTaskHours = require("../models/AddTaskHours");

exports.deleteTaskData = async (deletedata) => {
  try {
    const { assignProjectId, date, day, hours, comments } = deletedata;

    // Find and delete task hour data
    const deletedTaskHour = await AddTaskHours.findOneAndDelete({
      assignProjectId: assignProjectId,
      date: date,
      day: day,
      hours: hours,
      comments: comments,
    });

    if (deletedTaskHour) {
      // Remove task hour data reference from AssignProject
      await AssignProject.findByIdAndUpdate(
        assignProjectId,
        { $pull: { addTaskHours: deletedTaskHour._id } },
        { new: true }
      );

      console.log("Task hour data deleted successfully.");
    } else {
      console.log("Task hour data not found.");
    }
  } catch (error) {
    console.error("Error deleting task hour data:", error);
  }
};
