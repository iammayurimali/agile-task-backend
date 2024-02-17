const User = require("../models/User");
const AssignProject = require("../models/AssignProject");
//const { options } = require("../routes/routes");
require("dotenv").config();

exports.assignProject = async (assignproject) => {

    const { developerId, assignedproject } = assignproject;

    const user = await User.findById({ _id: developerId });

    if (!user) {
      throw new Error("User not found");
    }

    const existingAssignment = await AssignProject.findOne({
      developerId: developerId,
      assignedproject: assignedproject,
    });

    if (existingAssignment) {
      throw new Error("User already assigned to this project");
    }

    const assignprojects = await new AssignProject({
      developerId,
      assignedproject,
    }).save();

    //const saveAssignedProjects = await assignProjects.save();

    const updateUser = await User.findByIdAndUpdate(
      { _id: developerId },
      { $push: { assignProject: assignprojects._id } },
      { new: true }
    );

    //const populatedUser = await updateUser.populate("assignProject");

    return assignprojects
  } 