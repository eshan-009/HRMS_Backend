const express = require("express")
const { addSkill, editSkill, deleteSkill } = require("../../controllers/skills")
const { auth } = require("../../middleware/auth")
const router = express.Router()


router.post("/addSkill",auth,addSkill)
router.patch("/editSkill/:skillId",auth,editSkill)
router.delete("/deleteSkill/:skillId",auth,deleteSkill)

module.exports = router