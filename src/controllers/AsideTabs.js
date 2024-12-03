const asideTabs = require("../models/asideTabs")



const getTabData = async(req,res)=>{
    try
    {
        
        const employee_Tab = req.body.accessList.includes("GET_EMPLOYEE_TAB")
        const organization_Tab = req.body.accessList.includes("GET_ORGANIZATION_TAB")
        const branch_Tab = req.body.accessList.includes("GET_BRANCH_TAB")
        const department_Tab = req.body.accessList.includes("GET_DEPARTMENT_TAB")
        const role_Tab = req.body.accessList.includes("GET_ROLE_TAB")
        const attendence_Tab = req.body.accessList.includes("GET_ATTENDENCE_DATA")

        if( !employee_Tab && !organization_Tab && !branch_Tab && !department_Tab )
        {
            return res.status().json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
       
        let requiredData = new Map()
        requiredData.set("Organization",organization_Tab)
        requiredData.set("Sub Organization",branch_Tab)
        requiredData.set("Employee",employee_Tab)
        requiredData.set("Department",department_Tab)
        requiredData.set("Role",role_Tab)
        requiredData.set("Role",attendence_Tab)

        const tabData = await asideTabs.find()
        let filteredTabData = tabData; 
        for(let [key,value] of requiredData )
        {
            if(!value)
            {
                filteredTabData = filteredTabData.filter((item)=>item.label!==key)
            }
        }
    //    console.log("00000000000000000>>>>>>>>>>>>>>>>>>",filteredTabData,"000000000000000000<<<<<<<<<<<<<<<<<<<<<<<")
        return res.status(200).json({
            success : true,
            message : "Tab Data fetched Successfully",
            data : filteredTabData
        })

    } catch (err){
        console.log(err);
        return res.json({
            success : false,
            message : "Something went wrong"
        })
    }
}




module.exports = {getTabData}



// const createTab = async(req,res)=>{
//     console.log(req.body)
//         const createTabData1 = await asideTabs.create({
//             label : "Organization",
//             children : [
//                 {
//                     label : "Create Organization",
//                     url:"/api/v1/getCustomAttributes"
//                 },
//                 {
//                     label : "Organization List",
//                     url:"/api/v1/getOrganization"
//                 }
//             ]
//         })
//     console.log("========CreateTab=======",createTabData1)
//         const createTabData2 = await asideTabs.create({
//             label : "Sub Organization",
//             children : [
//                 {
//                     label : "Create Sub Organization",
//                     url:"/api/v1/addSubOrganization"
//                 },
//                 {
//                     label : "Sub Organization List",
//                     url:"/api/v1/getSubOrganization"
//                 }
//             ]
//         })
    
//         const createTabData3 = await asideTabs.create({
//             label : "Department",
//             children : [
//                 {
//                     label : "Create Department",
//                     url:"/api/v1/addDepartment"
//                 },
//                 {
//                     label : "Department List",
//                     url:"/api/v1/getDepartment"
//                 }
//             ]
//         })
    
//         const createTabData4 = await asideTabs.create({
//             label : "Role",
//             children : [
//                 {
//                     label : "Create Role",
//                     url:"/api/v1/addRole"
//                 },
//                 {
//                     label : "Role List",
//                     url:"/api/v1/getRoles"
//                 }
//             ]
//         })
    
//         const createTabData5 = await asideTabs.create({
//             label : "Employee",
//             children : [
//                 {
//                     label : "Create Employee",
//                     url:"/api/v1/addEmployee"
//                 },
//                 {
//                     label : "Role List",
//                     url:"/api/v1/getEmployees"
//                 }
//             ]
//         })

// const createTabData6 = await asideTabs.create({
//     label : "Attendence",
//     children : [
//         {
//             label : "Configure Shift Timings",
//         }
//     ]
// })
    
    
//     }






