const mongoose = require("mongoose");

const addTaskHoursSchema = new mongoose.Schema({
    assignProjectId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"AssignProject",
    },
    startdate: {
        type: String,
        required: true
    },
    enddate: {
        type: String,
        required:true
    },
    taskHours: [{
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
    }],
    totalWeekHours:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"TotalWeekHours",
    }
});
//addTaskHoursSchema.index({ assignProjectId: 1, 'taskHours.date': 1 }, { unique: true });
module.exports = mongoose.model("AddTaskHours", addTaskHoursSchema);