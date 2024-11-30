const express = require("express")
const { addSkill, editSkill, deleteSkill, getAllSkills } = require("../../controllers/skills")
const { auth } = require("../../middleware/auth")
const router = express.Router()


router.get("/getAllSkills",auth,getAllSkills)
router.post("/addSkill",auth,addSkill)
router.put("/editSkill/:skillId",auth,editSkill)
router.delete("/deleteSkill/:skillId",auth,deleteSkill)

module.exports = router