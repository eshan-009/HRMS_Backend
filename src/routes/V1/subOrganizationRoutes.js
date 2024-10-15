const express = require("express")
const { addBranch, editBranch, deleteBranch, getBranch, assignOrganization, unassignOrganization } = require("../../controllers/Branch")
const { auth } = require("../../middleware/auth")
const router = express.Router()


router.post("/addBranch/:organizationId",auth,addBranch)
router.patch("/editBranch/:branchId",auth,editBranch)
router.delete("/deleteBranch/:organizationId/:branchId",auth,deleteBranch)
router.post("/assignOrganization-branch/:branchId/:organizationId",auth,assignOrganization)
router.post("/unAssignOrganization-branch/:branchId/:organizationId",auth,unassignOrganization)
router.get("/getBranchData/",auth,getBranch)

module.exports = router