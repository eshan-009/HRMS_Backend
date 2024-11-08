const branch = require("../models/branch")
const department = require("../models/department")
const organization = require("../models/organization")


const getDepartment = async(req,res)=>{
    try{
        const access = req.body.accessList.includes("GET_ALL_DEPARTMENTS")
        if(!access)
        {
            return res.status().json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
        const page = req.query.page
        const limit = req.query.limit

        if(!page || !limit)
        {
            return res.json({
                success : true,
                messsage : "Please senn all query parameters"
            })
        }

        const departmentData= await department.find().skip((page-1)*limit).limit(limit)

        if(departmentData)
        {
            return res.status(200).json({
                success : true,
                message : "Department data fetched sucessfully",
                data : departmentData
            })
        }

        return res.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    } catch (err){
        return res.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    }
}

const getDepartmentByOrganization = async(req,res)=>{
    try{
     
        const access = req.body.accessList.includes("GET_ALL_DEPARTMENTS")
        if(!access)
        {
            return res.status().json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
        console.log("Here1")
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        const {organizationId} = req.params
        console.log("============================>>>>",page,limit,"<<<<<===========================")
        if(!page || !limit)
        {
            return res.json({
                success : true,
                messsage : "Please send all query parameters"
            })
        }
        console.log("Here2")
        const orgData = await organization.findById(organizationId).select("departments").populate({
            path : "departments",
            skip : (page-1)*limit,
            limit : limit+1
           })
           console.log(orgData)
        // const departmentData= await department.find().skip((page-1)*limit).limit(limit)
           const departmentData = orgData.departments

           const isLast = departmentData.length>limit ? false : true 
        if(departmentData)
        {
            return res.status(200).json({
                success : true,
                message : "Department data fetched sucessfully",
                data : departmentData.length>limit ? departmentData.slice(0,departmentData.length-1) : departmentData,
                isLast: isLast
            })
        }

        return res.json({
            success : false,
            message : "No Department found"
        })
    } catch (err){
        return res.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    }
}

const getUnassignedDepartment = async(req,res)=>{
    try{
     console.log("Here1")
        const access = req.body.accessList.includes("GET_ALL_DEPARTMENTS")
        if(!access)
        {
            return res.status().json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
        console.log("Here2")
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
       
        if(!page || !limit)
        {
            return res.json({
                success : true,
                messsage : "Please send all query parameters"
            })
        }
    
      
       
        const departmentData= await department.find({Organization : null}).skip((page-1)*limit).limit(limit+1).exec()
        // .skip((page-1)*limit).limit(limit+1).lean().exec()
        const isLast = departmentData.length>limit ? false : true

        console.log("===========================DEPP=>>>>",page,limit,isLast,departmentData.length,"<<<<<===========================")
        if(departmentData)
        {
            return res.status(200).json({
                success : true,
                message : "Unassigned Department data fetched sucessfully",
                data : departmentData.length>limit ? departmentData.slice(0,departmentData.length-1) :departmentData,
                isLast : isLast
            })
        }

        return res.json({
            success : false,
            message : "No Department found"
        })
    } catch (err){
        return res.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    }
}

const createDepartment = async(req,res)=>{
    try{
        const access = req.body.accessList.includes("ADD_DEPARTMENT")
        if(!access)
        {
            return res.status().json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
const {name,description,customAttributes} = req.body
const {OrganizationId,managerId} = req.params

if(!name || !description || !customAttributes || !OrganizationId || !managerId)
    {
        return res.status(400).json({
            success : false,
            message : "Please fill all details"
        })
    }      
const checkDepartment = await department.find({name:name})
        if(checkDepartment.length>0)
        {
            return res.json({
                success : false,
                message : "Department Already Exist"
            })
        }
        
        const addDepartment = await department.create({
            name : name,
            description : description,
            Organization : OrganizationId,
            manager : managerId,
            customAttributes : customAttributes
        })
        if(addDepartment)
        {
            const organizationData = await organization.findById(OrganizationId)

            organizationData.departments.push(addDepartment._id)

            organizationData.save()
          
            return res.status(200).json({
                success : true,
                message : "Department created Successfully",
                departmentData : addDepartment
            })
        }
        return res.status(500).json({
            success : false,
            message :"Something went wrong"
        })
       
    } catch (err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message :"Something went wrong"
        })
    }
}

const editDepartment = async(req,res)=>{
    try{
        const access = req.body.accessList.includes("UPDATE_DEPARTMENT")
        if(!access)
        {
            return res.status().json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
        const {name,description,customAttributes} = req.body
        const {departmentId,managerId} = req.params
if(!name || !description || !managerId || !customAttributes || !departmentId)
{
    return res.json({
        success : false,
        message : "Please enter all details"
    })
}
const departmentData = await department.findById(departmentId)

if(departmentData)
{
departmentData.name = name;
departmentData.description = description;
// departmentData.Organization = OrganizationId;
departmentData.manager = managerId
departmentData.customAttributes = customAttributes;

const newData = await departmentData.save();

if(newData)
{
    return res.status(200).json({
        success :true,
        message : "Department updated successfully",
        data : newData
    })
}
}


return res.status(500).json({
    success : false,
    message : "Something went wrong"
})

    } catch (err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    }
}

const deleteDepartment = async(req,res)=>{
    try{
        const access = req.body.accessList.includes("DELETE_DEPARTMENT")
        if(!access)
        {
            return res.status().json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
        const {departmentId} = req.params

           const departmentData = await department.findById(departmentId)
           console.log(departmentData)
           const organizationId = departmentData.Organization;
           const branchId = departmentData.branch
const branchData = await branch.findById(branchId)
const organizationData = await organization.findById(organizationId)
   console.log("=========Branch========",branchData,
    "================Branch============="

   )
   console.log("=========Branch========",organizationData,
    "================Branch============="

   )
const deleteDepartment = await department.findByIdAndDelete(departmentId)

if(deleteDepartment)
{
   
 if(branchData && branchData.departments.length>0 )
 {
    const branchindex =  branchData.departments.indexOf(departmentId)
    branchData.departments.splice(branchindex,1)
    branchData.save()
 }

   
 if(organizationData && organizationData.departments.length>0)
 {
    const orgindex =  organizationData.departments.indexOf(departmentId)
    organizationData.departments.splice(orgindex,1)

    organizationData.save()
 }

    return res.json({
        success : true,
        message : "Department Deleted Successfully"
    })
}
  return res.status(500).json({
            success : false,
            message :"Something went wrong"
        })
       
    } catch (err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message :"Something went wrong"
        })
    }
}

const assignBranch = async(req,res)=>{
    try{
        const access = req.body.accessList.includes("ASSIGN_BRANCH_TO_DEPARTMENT")
        if(!access)
        {
            return res.status().json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
        const {departmentId,branchId}=req.params
        const branchData = await branch.findById(branchId);
        const departmentData = await department.findById(departmentId)
        console.log({departmentId,branchId},branchData,departmentData)
        if(departmentData && branchData)
        {
            departmentData.branch = branchData._id;
            console.log(branchData.departments)
            const found = branchData.departments.find((item)=>item.equals(departmentData._id))
            if(!found)
            {
                branchData.departments.push(departmentData._id)
            }
            branchData.save()
            departmentData.save()
            return res.status(200).json({
                success : true,
                message :"Department assigned to requested branch"
            })
        }

        return res.status(500).json({
            success : false,
            message :"Something went wrong"
        })

    } catch (err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message :"Something went wrong"
        })
    }

}

const assignOrganization = async(req,res)=>{
    try{
        const access = req.body.accessList.includes("ASSIGN_ORGANIZATION_TO_DEPARTMENT")
        if(!access)
        {
            return res.status().json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
        const {departmentId,organizationId}=req.params
        const departmentData = await department.findById(departmentId)
        const organizationData = await organization.findById(organizationId)

       if(departmentData && organizationData)
       {
        departmentData.Organization = organizationData._id
        const found = organizationData.departments.find((item)=>item.equals(departmentData._id))
   if(!found)
   {
    organizationData.departments.push(departmentData._id)
    organizationData.save()
    departmentData.save()
   
   }
   return res.status(200).json({
    success : true,
    message :"Department assigned to requested Organization"
})
       }
   return res.status(500).json({
    success : false,
    message :"Something went wrong"
})
    } catch (err){
            console.log(err);
            return res.status(500).json({
                success : false,
                message :"Something went wrong"
            })
    }
}
const unassignBranch = async(req,res)=>{
    try{
        const access = req.body.accessList.includes("REMOVE_DEPARTMENT_FROM_BRANCH")
        if(!access)
        {
            return res.status().json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
        const {departmentId,branchId}=req.params
        const branchData = await branch.findById(branchId);
        const departmentData = await department.findById(departmentId)
        if(departmentData && branchData)
        {
            departmentData.branch = null;
            const found = branchData.departments.find((item)=>item.equals(departmentData._id))
            if(found)
            {
             const index = branchData.departments.indexOf(found)
            branchData.departments.splice(index,1)
            }

            branchData.save();
            departmentData.save();

            return res.status(200).json({
                success : true,
                message :"Branch unassigned"
            })
        }
        return res.status(500).json({
            success : false,
            message :"Something went wrong"
        })
    } catch (err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message :"Something went wrong"
        })
    }
}
const unassignOrganization = async(req,res)=>{
    try{
        const access = req.body.accessList.includes("REMOVE_DEPARTMENT_FROM_ORGANIZATION")
        if(!access)
        {
            return res.status().json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
        const {departmentId,organizationId}=req.params
        const departmentData = await department.findById(departmentId)
        const organizationData = await organization.findById(organizationId)
      
       if(departmentData && organizationData)
       {
        departmentData.Organization = null
        const found = organizationData.departments.find((item)=>item.equals(departmentData._id))
        if(found)
        {
            const index = organizationData.departments.indexOf(found)
            organizationData.departments.splice(index,1)
        }

        departmentData.save()
        organizationData.save()
        
        return res.status(200).json({
            success : true,
            message :"Organization unassigned"
        })
       }
       return res.status(500).json({
        success : false,
        message :"Something went wrong"
    })
    } catch (err){
        return res.status(500).json({
            success : false,
            message :"Something went wrong"
        })
    }
}

module.exports = {getDepartment,getDepartmentByOrganization,getUnassignedDepartment,createDepartment,
    editDepartment,deleteDepartment,assignBranch,
    assignOrganization,unassignBranch,unassignOrganization}