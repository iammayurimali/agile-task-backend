const mongoose = require("mongoose");

const validProjects = ["RH", "Project A", "Project B"];

const assignProjectSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
    assignedproject:{
        type:String,
        required:true,
        trim:true,   
        enum: validProjects
    }
});

module.exports = mongoose.model("AssignProject", assignProjectSchema);