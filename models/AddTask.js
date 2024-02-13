const mongoose = require("mongoose");

const addTaskSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"User",
    },
    project:{
        type:String,
        required:true,
        trim:true,
    },
    date:{
        type:String,
        required:true,
        trim:true,
    },
    taskdone:{
        type:String,
        required:true,
        trim:true,  
    },
    starttime:{
        type:String,
        required:true,
        trim:true,
    },
    endtime:{
        type:String,
        required: true
    }
});

module.exports = mongoose.model("AddTask", addTaskSchema);