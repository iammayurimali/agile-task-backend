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
    addTask:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"AddTask",
    }],
    assignProject:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"AssignProject",
    }]
});

module.exports = mongoose.model("User", userSchema);