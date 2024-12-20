const express = require("express")
const { addEmployee, addEmployeePersonalDetails, addemployeeAdditionalDetails, editEmployeePersonalDetails, editEmployeeAdditionalDetails, assignDepartmentToEmployee, unAssignDepartmentToEmployee, deleteEmployee, getEmployees, getEmployeebyname, getEmployeebyPDetailId, getEmployeesByDepartment } = require("../../controllers/Employee")
const { auth } = require("../../middleware/auth")
const { getUserById } = require("../../controllers/User")
const router = express.Router()

router.get("/getUserById/:userId",auth,getUserById)
router.get("/getEmployeeData/",auth,getEmployees)
router.get("/getEmployeeByDepartment/:departmentId/",auth,getEmployeesByDepartment)
router.post("/createEmployee/:organizationId/:roleId",auth,addEmployee)
router.post("/createProfile/:userId",auth,addEmployeePersonalDetails)
router.post("/createAdditionalDetails/:userId",auth,addemployeeAdditionalDetails)
router.put("/editProfile/:userId",auth,editEmployeePersonalDetails)
router.put("/editAdditionalDetails/:userId",auth,editEmployeeAdditionalDetails)
router.patch("/assignDepartment/:userId/:departmentId",auth,assignDepartmentToEmployee)
router.patch("/unAssignDepartment/:userId/:departmentId",auth,unAssignDepartmentToEmployee)
router.delete("/deleteEmployee/:userId",auth,deleteEmployee)
router.post("/searchEmployeeByName",auth,getEmployeebyname)
router.get("/getEmployeeDetailsbyPID/:pDetailId",auth,getEmployeebyPDetailId)
module.exports = router