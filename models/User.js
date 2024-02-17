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
        enum:["Developer", "Manager"],
        required: true
    }, 
    approved: {
        type: Boolean,
        default: true,
    },
    token: {
        type: String,
        
    },
    assignProject:[{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"AssignProject",
    }]
    
});

module.exports = mongoose.model("user", userSchema);