const express = require("express")
const { createDepartment, editDepartment, deleteDepartment, getDepartment, assignBranch, unassignBranch, assignOrganization, unassignOrganization, getDepartmentByOrganization, getUnassignedDepartment } = require("../../controllers/Department")
const { auth } = require("../../middleware/auth")
const router = express.Router()

router.get("/getDepartmentData/",auth,getDepartment)
router.get("/getDepartmentByOrganization/:organizationId",auth,getDepartmentByOrganization)
router.get("/getUnassignedDepartment",auth,getUnassignedDepartment)


router.post("/addDepartment/:OrganizationId/:managerId",auth,createDepartment)
router.patch("/editDepartment/:managerId/:departmentId",auth,editDepartment)
router.delete("/deleteDepartment/:departmentId",auth,deleteDepartment)
router.patch("/assignBranch/:departmentId/:branchId",auth,assignBranch)
router.patch("/unAssignBranch/:departmentId/:branchId",auth,unassignBranch)
router.patch("/assignOrganization/:departmentId/:organizationId",auth,assignOrganization)
router.patch("/unAssignOrganization/:departmentId/:organizationId",auth,unassignOrganization)


module.exports = router

