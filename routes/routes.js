const express = require("express");
const router = express.Router();
 

const {signup, login} = require("../controllers/Auth");
const {auth, isEmplyoee,isManager} = require("../middlewares/auth");
const {assignProject} = require("../controllers/AssignProject")
const {addCompletedTask} = require("../controllers/AddCompletedTask")
const {viewAddedTask , viewTaskByDate} = require("../controllers/ViewAddedTask")

router.post("/login", login);
router.post("/signup", signup);
router.post("/assignProject", assignProject)
router.post("/addCompletedTask", addCompletedTask)
router.get("/viewAddedTask/:id", viewAddedTask)
router.get("/viewAddedTask/:date", viewTaskByDate)


//Protected routes
router.get("/emplyoee", auth, isEmplyoee, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for Emplyoee',
    });
} );

router.get("/manager", auth, isManager, (req,res) => {
    res.json({
        success:true,
        message:'Welcome to the Protected route for manager',
    });
});

module.exports = router;