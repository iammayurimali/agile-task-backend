const mongoose = require("mongoose");

const validProjects = ["RH", "Project A", "Project B"];

const assignProjectSchema = new mongoose.Schema({
    developerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    assignedproject:{
        type:String,
        required:true,
        trim:true,   
        enum: validProjects
    },
    addTaskHours:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"AddTaskHours"
    }]
});

module.exports = mongoose.model("AssignProject", assignProjectSchema);