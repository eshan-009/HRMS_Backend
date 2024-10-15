const express = require("express")
const { getOrganizations, addOrganization, deleteOrganization, editOrganization } = require("../../controllers/Organization")
const { auth } = require("../../middleware/auth")
const router = express.Router()

router.get("/getOrganizations/",auth,getOrganizations)
router.post("/addOrganization",auth,addOrganization)
router.patch("/editOrganization/:organizationId",auth,editOrganization)
router.delete("/deleteOrganization/:organizationId",auth,deleteOrganization)


module.exports = router