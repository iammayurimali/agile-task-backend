const AssignProject = require("../models/AssignProject");
const AddTaskHours = require("../models/AddTaskHours");

exports.deleteTaskData = async (deletedata) => {
  try {
    const { assignProjectId, date, day, hours, comments } = deletedata;

    const deletedTaskHour = await AddTaskHours.findOneAndDelete({
      assignProjectId: assignProjectId,
      date: date,
      day: day,
      hours: hours,
      comments: comments,
    });

    if (deletedTaskHour) {
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
