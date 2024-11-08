const express = require("express")
const { addBranch, editBranch, deleteBranch, getBranch, assignOrganization, unassignOrganization, getBranchByOrganization, getUnassignedBranches } = require("../../controllers/Branch")
const { auth } = require("../../middleware/auth")
const router = express.Router()


router.post("/addBranch/:organizationId",auth,addBranch)
router.put("/editBranch/:branchId",auth,editBranch)
router.delete("/deleteBranch/:organizationId/:branchId",auth,deleteBranch)
router.patch("/assignOrganization-branch/:branchId/:organizationId",auth,assignOrganization)
router.patch("/unAssignOrganization-branch/:branchId/:organizationId",auth,unassignOrganization)
router.get("/getBranchData/",auth,getBranch)
router.get("/getUnassignedBranches",auth,getUnassignedBranches)
router.get("/getBranchesByOrganization/:organizationId",auth,getBranchByOrganization)
module.exports = router