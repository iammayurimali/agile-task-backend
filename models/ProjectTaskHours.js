const mongoose = require("mongoose");

const taskHoursSchema = new mongoose.Schema({
    assignProjectId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref:"AssignProject",
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

    } ]
});
module.exports = mongoose.model("projectTaskHours", taskHoursSchema);