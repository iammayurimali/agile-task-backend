const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        trim:true,
    },
    lastname:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    password:{
        type:String,
        required:true,
    },
    accountType:{
        type:String,
        enum:["Emplyoee", "Manager"],
        required: true
    }, 
    assignProject:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"AssignProject",
    }],
    addTaskHours:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"AddTaskHours",
    }],
    
});

module.exports = mongoose.model("User", userSchema);