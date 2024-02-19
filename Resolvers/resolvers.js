const User = require("../models/User");
const { signup, login } = require("../controllers/Auth");
const { assignProject } = require("../controllers/AssignProject");
const { addCompletedTask } = require("../controllers/AddCompletedTask");
const bcrypt = require("bcrypt");
const { editTaskAdded } = require("../controllers/EditTaskAdded");
const AssignProject = require("../models/AssignProject");

const resolvers = {
  Query: {
    hello: () => {
      return "Hello World";
    },
    getUser: async () => {
      const users = await User.find().populate({
        path: "assignProject",
        populate: {
          path: "addTaskHours",
          populate: {
            path: "taskHours",
            model: "TaskHour", 
          },
        },
      });

      return users;
    },
    getAllDevelopers: async () => {
      try {
        const developers = await User.find({ accountType: "Developer" });
        return developers;
      } catch (error) {
        console.error("Error fetching developers:", error);
        throw new Error("Error fetching developers");
      }
    },
    getUserByID: async (_,args) => {
      try {
        const user = await User.findOne({ _id: args.id }).populate("assignProject");
    
        return user;
      } catch (error) {
        console.error("Error fetching assigned projects:", error);
        throw new Error("Error fetching assigned projects");
      }
    },
    getAssignedProject: async (_,args) => {
      try {
        const user = await AssignProject.find({ developerId: args.id });
    
        return user;
      } catch (error) {
        console.error("Error fetching assigned projects:", error);
        throw new Error("Error fetching assigned projects");
      }
    },
    
  },
  Mutation: {
    signup: async (parent, args, context, info) => {
      try {
        const newUser = await signup(args.userData);
        console.log("Signup details:", newUser);
        return newUser;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    login: async (parent, args, context, info) => {
      try {
        const loginDetails = await login(args.loginData, context);
        console.log("login details:", loginDetails);
        return loginDetails;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    assignProject: async (parent, args, context, info) => {
      try {
        const assignProjectDetail = await assignProject(args.assignproject);
        // console.log("assign details",assignProjectDetail)
        return assignProjectDetail;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    addTaskHours: async (parent, args, context, info) => {
      try {
        const taskHoursDetail = await addCompletedTask(args.taskHour);
        console.log("assign details",taskHoursDetail)
        return taskHoursDetail;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    editAddedTask: async (parent, args, context, info) => {
      try {
        const editTaskDetail = await editTaskAdded(args.editTask);
        // console.log("assign details",taskHoursDetail)
        return editTaskDetail;
      } catch (error) {
        throw new Error(error.message);
      }
    },
  },
};

module.exports = resolvers;
