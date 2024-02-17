const express = require("express");
const router = express.Router();
 

const {signup, login} = require("../controllers/Auth");
const {auth, isDeveloper,isManager} = require("../middlewares/auth");
const {assignProject} = require("../controllers/AssignProject")
const {addCompletedTask} = require("../controllers/AddCompletedTask")
const {viewAddedTask} = require("../controllers/ViewAddedTask")
const {editTaskAdded} = require("../controllers/EditTaskAdded");

router.post("/login", login);
router.post("/signup", signup);
router.post("/assignProject", assignProject)
router.post("/addCompletedTaskHour", addCompletedTask)

router.get("/viewAddedTask/:id", viewAddedTask)

router.put("/editTasksAdded", editTaskAdded)


//Protected routes
router.get("/developer", auth, isDeveloper, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for Developer',
       // role: req.user.role
       // id: req.user.id
    });
} );

router.get("/manager", auth, isManager, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for manager',
    });
});

module.exports = router;