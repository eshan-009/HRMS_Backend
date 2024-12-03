const fullAccessList = require("../models/fullAccessList");


 async function getFullAccessList(req, res)  {
  try {
   
    const access = req.body.accessList.includes("GET_ACCESS_PRIVILEGES");
    // console.log(access)
    if (!access) {
      return res.status(400).json({
        success: false,
        message: "Not Authorized to perform this action",
      });
    }
   

    const accessData = await fullAccessList.find();

    // console.log("data--------------",accessData)
    if (accessData) 
      {
      return res.status(200).json({
        success: true,
        message: "Access list fetched successfully",
        data: accessData,
      });
    }
   else
   {
    return res.status(500).json({
      success: true,
      message: "Something went wrong",
    });
   }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: true,
      message: "Something went wrong",
    });
  }
};




// const createFullAccessList = async (req, res) => {
//   try {
//     const accessListData = await fullAccessList.create({
//       accessList: [
//         "GET_EMPLOYEE_TAB",
//         "GET_ORGANIZATION_TAB",
//         "GET_BRANCH_TAB",
//         "GET_DEPARTMENT_TAB",
//         "GET_ROLE_TAB",
//         "GET_EMPLOYEE_ATTRIBUTE",
//         "GET_ORGANIZATION_ATTRIBUTE",
//         "GET_BRANCH_ATTRIBUTE",
//         "GET_DEPARTMENT_ATTRIBUTE",
//         "CREATE_EMPLOYEE_ATTRIBUTE",
//         "CREATE_ORGANIZATION_ATTRIBUTE",
//         "CREATE_BRANCH_ATTRIBUTE",
//         "CREATE_DEPARTMENT_ATTRIBUTE",
//         "UPDATE_EMPLOYEE_ATTRIBUTE",
//         "UPDATE_ORGANIZATION_ATTRIBUTE",
//         "UPDATE_BRANCH_ATTRIBUTE",
//         "UPDATE_DEPARTMENT_ATTRIBUTE",
//         "DELETE_EMPLOYEE_ATTRIBUTE",
//         "DELETE_ORGANIZATION_ATTRIBUTE",
//         "DELETE_BRANCH_ATTRIBUTE",
//         "DELETE_DEPARTMENT_ATTRIBUTE",
//         "GET_ALL_BRANCHES",
//         "ADD_BRANCH",
//         "UPDATE_BRANCH",
//         "DELETE_BRANCH",
//         "ASSIGN_ORGANIZATION_TO_BRANCH",
//         "REMOVE_BRANCH_FROM_ORGANIZATION",
//         "GET_ALL_DEPARTMENTS",
//         "ADD_DEPARTMENT",
//         "UPDATE_DEPARTMENT",
//         "DELETE_DEPARTMENT",
//         "ASSIGN_BRANCH_TO_DEPARTMENT",
//         "ASSIGN_ORGANIZATION_TO_DEPARTMENT",
//         "REMOVE_DEPARTMENT_FROM_BRANCH",
//         "REMOVE_DEPARTMENT_FROM_ORGANIZATION",
//         "GET_ALL_EMPLOYEES",
//         "GET_EMPLOYEES_BY_NAME",
//         "GET_ACCESS_PRIVILEGES",
//         "ADD_EMPLOYEE",
//         "ADD_EMPLOYEE_PERSONAL_DETAILS",
//         "ADD_EMPLOYEE_ADDITIONAL_DETAILS",
//         "UPDATE_EMPLOYEE_PERSONAL_DETAILS",
//         "UPDATE_EMPLOYEE_ADDITIONAL_DETAILS",
//         "DELETE_EMPLOYEE",
//         "ASSIGN_DEPARTMENT_TO_EMPLOYEE",
//         "REMOVE_EMPLOYEE_FROM_DEPARTMENT",
//         "GET_ALL_ORGANIZATIONS",
//         "ADD_ORGANIZATION",
//         "UPDATE_ORGANIZATION",
//         "DELETE_ORGANIZATION",
//         "GET_ALL_ROLES",
//         "ADD_ROLE",
//         "UPDATE_ROLE",
//         "DELETE_ROLE",
//         "ADD_SKILL",
//         "UPDATE_SKILL",
//         "DELETE_SKILL",

//         "GET_ALL_ATTENDANCE",
//         "UPDATE_LEAVE_TYPE",
//         "GET_ALL_LEAVE_REQUESTS",
//         "GET_DECLINED_REQUEST_OF_EMPLOYEE",
//         "GET_ALL_PERFORMANCE_OF_EMPLOYEE",
//         "GET_PENDING_LEAVE_REQUEST_OF_EMPLOYEE",
//         // "CHANGE_USER_ROLE",
//         "GET_LEAVE_TYPE",
//         // "ASSIGN_ROLE_TO_USER",
//         // "UPDATE_ADDRESS",
//         // "UPDATE_ROLE",
//         "GET_APPROVED_REQUEST_OF_EMPLOYEE",
//         "GET_LEAVE_REQUEST_OF_EMPLOYEE",
//         "DECLINE_LEAVE_REQUEST",
//         "GET_EMPLOYEE_EMERGENCY_CONTACT",

//         "REMOVE_LEAVE_TYPE",
//         "GET_ALL_LEAVE_TYPES",

//         "ADD_EMPLOYEE_PERFORMANCE",
//         "ADD_SHIFT_DURATION",
//         "UPLOAD_EMPLOYEE_IMAGE",

//         "ADD_ATTENDANCE_LOCATION",
//         "UPDATE_SHIFT_DURATION",
//         "GET_ALL_DESIGNATION",
//         "GET_ALL_ATTENDANCE_LOCATION",

//         "GET_SHIFT_DURATION",

//         "DELETE_PERFORMANCE_RECORD",

//         "GET_ALL_PERFORMANCES",
//         "DELETE_ATTENDANCE_LOCATION",
//         "ADD_LEAVE_TYPE",

//         "UPDATE_ATTENDANCE_RECORD",

//         // "FIND_EMPLOYEE_BY_ID",

//         "APPROVE_LEAVE_REQUEST",

//         // "SEARCH_EMPLOYEE_BY_MANAGER_ID",

//         "UPDATE_ATTENDANCE_LOCATION",
//         // "DELETE_DESIGNATION",

//         "GET_PERFORMANCE_BY_REVIEWER",

//         "DELETE_SHIFT_DURATION",
//         "GET_LEAVE_BALANCE_FOR_ALL_EMPLOYEES",
//         // "UPDATE_DESIGNATION",
//         // "ADD_DESIGNATION",
//         "CREATE_LEAVE_REQUEST",
//       ],
//     });

//     if (accessListData) {
//       console.log("Full AccessList Added to DB\n");
//       console.log(accessListData);
//     }
//   } catch (err) {
//     console.log(err);
//     console.log("Error Adding full AccessList Added to DB\n");
//   }
// };


module.exports = {getFullAccessList}