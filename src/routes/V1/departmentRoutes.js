const express = require("express")
const { createDepartment, editDepartment, deleteDepartment, getDepartment, assignBranch, unassignBranch, assignOrganization, unassignOrganization } = require("../../controllers/Department")
const { auth } = require("../../middleware/auth")
const router = express.Router()

router.get("/getDepartmentData/",getDepartment)

router.post("/addDepartment/:OrganizationId/:managerId",auth,createDepartment)
router.patch("/editDepartment/:departmentId",auth,editDepartment)
router.delete("/deleteDepartment/:departmentId",auth,deleteDepartment)
router.post("/assignBranch/:departmentId/:branchId",auth,assignBranch)
router.post("/unAssignBranch/:departmentId/:branchId",auth,unassignBranch)
router.post("/assignOrganization/:departmentId/:organizationId",auth,assignOrganization)
router.post("/unAssignOrganization/:departmentId/:organizationId",auth,unassignOrganization)


module.exports = router

