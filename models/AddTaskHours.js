const mongoose = require("mongoose");

const addTaskHoursSchema = new mongoose.Schema({
    assignProjectId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"AssignProject",
    },
    taskHours: [{
        date: {
            type: Date,
            default: Date.now(),
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
addTaskHoursSchema.index({ assignProjectId: 1, 'taskHours.date': 1 }, { unique: true });
module.exports = mongoose.model("AddTaskHours", addTaskHoursSchema);