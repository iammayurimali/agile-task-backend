const mongoose = require("mongoose");

const addTaskHoursSchema = new mongoose.Schema({
    assignProjectId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"AssignProject",
    },
    date: {
        type: String,
        required:true
    },
    day: {
        type: String,
        required:true
    },
    hours: {
        type: Number,
        default: 0,
        required: true,
    },
    comments: {
        type : String,
        required: true
    },
    totalWeekHours:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"TotalWeekHours",
    }
});
module.exports = mongoose.model("AddTaskHours", addTaskHoursSchema);