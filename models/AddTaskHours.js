const mongoose = require("mongoose");

const addTaskHoursSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User",
    },
    assignProjectId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"AssignProject",
    },
    date:{
        type:String,
        required:true,
        trim:true,
    },
    taskHours:{ 
        type:String,
        required:true,
        trim:true,  
    },
    totalWeekHours:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"TotalWeekHours",
    }
});

module.exports = mongoose.model("AddTaskHours", addTaskHoursSchema);