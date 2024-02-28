const User = require("../models/User");
//onst AddTaskHours = require("../models/AddTaskHours");
// const { options } = require("../routes/routes");
require("dotenv").config();

exports.viewAddedTask = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await User.findById({_id:id}).populate("assignProject");

    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    if(user.assignProject.length === 0){
        return res.status(404).json({
            status: false,
            message:"No Task Added"
        })
    }
    return res.status(200).json({
      status: true,
      message: "User's tasks retrieved successfully",
      data: user,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      status: false,
      message: "Error retrieving user's tasks",
    });
  }
};


