const express = require("express")


const { addTiming, addLocation, getAttendenceData, editTiming, editLocation, deleteLocation, deleteTiming } = require("../../controllers/Attendence")
const { auth } = require("../../middleware/auth")
const router = express.Router()

router.post("/addLocation",auth,addLocation)
router.put("/editLoaction/:attendenceId/:locationId",auth,editLocation)
router.delete("/deleteLocation/:attendenceId/:locationId",auth,deleteLocation)
router.post("/addTiming",auth,addTiming)
router.put("/editTiming/:attendenceId",auth,editTiming)
router.delete("/deleteTiming/:attendenceId",auth,deleteTiming)
router.get("/getAttendenceData",auth,getAttendenceData)



module.exports = router