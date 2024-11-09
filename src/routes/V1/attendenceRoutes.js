const express = require("express")

const { auth } = require("../../middleware/auth")
const { addTiming } = require("../../controllers/Attendence")
const router = express.Router()

router.post("/addLocation",auth,addTiming)
router.post("/editLoaction",auth,)
router.delete("/deleteLocation",auth,)
router.post("/addTiming",auth,)
router.post("/editTiming",auth,)
router.post("/deleteTiming",auth,)
router.get("/getAttendenceData",auth,)



module.exports = router