const express = require("express")
const { addEmployee, addEmployeePersonalDetails, addemployeeAdditionalDetails, editEmployeePersonalDetails, editEmployeeAdditionalDetails, assignDepartmentToEmployee, unAssignDepartmentToEmployee, deleteEmployee, getEmployees, getEmployeebyname, getEmployeebyPDetailId, getEmployeesByDepartment } = require("../../controllers/Employee")
const { auth } = require("../../middleware/auth")
const { getUserById } = require("../../controllers/User")
const router = express.Router()

router.get("/getUserById",auth,getUserById)
router.get("/getEmployeeData/",auth,getEmployees)
router.get("/getEmployeeByDepartment/:departmentId/",auth,getEmployeesByDepartment)
router.post("/createEmployee/:organizationId/:roleId",auth,addEmployee)
router.post("/createProfile/:userId",auth,addEmployeePersonalDetails)
router.post("/createAdditionalDetails/:userId",auth,addemployeeAdditionalDetails)
router.patch("/editProfile/:userId",auth,editEmployeePersonalDetails)
router.patch("/editAdditionalDetails/:userId",auth,editEmployeeAdditionalDetails)
router.post("/assignDepartment/:userId/:departmentId",auth,assignDepartmentToEmployee)
router.post("/unAssignDepartment/:userId/:departmentId",auth,unAssignDepartmentToEmployee)
router.delete("/deleteEmployee/:userId",auth,deleteEmployee)
router.get("/searchEmployeeByName",getEmployeebyname)
router.get("/getEmployeeDetailsbyPID/:pDetailId",getEmployeebyPDetailId)
module.exports = router