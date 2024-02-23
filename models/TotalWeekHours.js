const mongoose = require("mongoose");

const totalWeekHoursSchema = new mongoose.Schema({
    addTaskHours:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"AddTaskHours",
    }],
    totalHours:{
        type:Number,
        required:true,
        trim:true
    },
});

module.exports = mongoose.model("TotalWeekHours", totalWeekHoursSchema);