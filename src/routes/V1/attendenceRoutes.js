const express = require("express")


const { addTiming, addLocation, getAttendenceData } = require("../../controllers/Attendence")
const { auth } = require("../../middleware/auth")
const router = express.Router()

router.post("/addLocation",auth,addLocation)
// router.post("/editLoaction",auth,)
// router.delete("/deleteLocation",auth,)
router.post("/addTiming",auth,addTiming)
// router.post("/editTiming",auth,)
// router.post("/deleteTiming",auth,)
router.get("/getAttendenceData",auth,getAttendenceData)



module.exports = router