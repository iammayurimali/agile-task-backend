const User = require("../models/User");
const AssignProject = require("../models/AssignProject");
//const { options } = require("../routes/routes");
require("dotenv").config();

//signup route handler
exports.assignProject = async (req, res) => {
  try {
    const { userId, assignedproject } = req.body;
     const user = await User.findById({_id: userId});

     if (!user) {
      return res.status(401).json({
        status: false,
        message: "User not found",
      });
    }
    const existingAssignment = await AssignProject.findOne({
      userId: userId,
      assignedproject: assignedproject,
    });

    if (existingAssignment) {
      return res.status(400).json({
        status: false,
        message: "User already assigned to this project",
      });
    }

    const assignProjects = new AssignProject({
      userId,
      assignedproject
    })

    const saveAssignedProjects = await assignProjects.save();
    
    const updateUser = await User.findByIdAndUpdate(
      { _id: userId },
      { $push: { assignProject: saveAssignedProjects._id } },
      { new: true }
    )
      .populate("assignProject")
      .exec();
    
    return res.status(200).json({
      status: true,
      message: 'Project assigned to user successfully',
      data: updateUser,
    });
    

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "No project exists",
    });
  }
};
