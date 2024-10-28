const express = require("express")
const { addRole, editRole, deleteRole, getRolesData } = require("../../controllers/Role")
const { auth } = require("../../middleware/auth")
const router = express.Router()


router.post("/addRole",auth,addRole)
router.put("/editRole/:roleId",auth,editRole)
router.delete("/deleteRole/:roleId",auth,deleteRole)
router.get("/getRoleData/",auth,getRolesData)
module.exports = router