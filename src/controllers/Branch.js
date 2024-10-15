const branch = require("../models/branch")
const { findById } = require("../models/department")
const organization = require("../models/organization")

const getBranch = async(req,res)=>{
    try{
        
        const access = req.body.accessList.includes("GET_ALL_BRANCHES")
        if(!access)
        {
            return res.status().json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        if(!page   || !limit)
        {
            return res.json({
                success : false,
                message : "Please enter all query parameters"
            })
        }
       
        const branchData = await branch.find().skip((page-1)*limit).limit(limit)
        if(branchData)
        {
            return res.status(200).json({
                success : false,
                messsage :"Branch data fetched successfully",
                data : branchData
            })
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
const addBranch = async(req,res)=>{
    try{
        const access = req.body.accessList.includes("ADD_BRANCH")
        if(!access)
        {
            return res.status().json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
        const {name,customAttributes}=req.body
        const {organizationId} = req.params

        if(!name || ! customAttributes || !organizationId)
        {
            return res.json({
                success : false,
                message : "Please fill al details"
            })
        }

        const checkBranch = await branch.findOne({name:name})

        if(checkBranch)
        {
            return res.json({
                success : false,
                message :"Branch Already exist"
            })
        }

       const addBranch = await branch.create({
            name:name,
            customAttributes : customAttributes
        })

        if(addBranch)
        {
            const Org = await organization.findById(organizationId)
            Org.branches.push(addBranch._id)
            Org.save();

            return res.status(200).json({
                success:true,
                message :"Branch created successfully"
            })
        }
        return res.status(500).json({
            success:true,
            message :"Something went wrong"
        })
    } catch (err){
        console.log(err)
        return res.status(500).json({
            success:true,
            message :"Error creating branch!!"
        })
    }
}

const editBranch = async(req,res)=>{
    try{
        const access = req.body.accessList.includes("UPDATE_BRANCH")
        if(!access)
        {
            return res.status().json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
        const {name,customAttributes}=req.body
        const {branchId} = req.params
        if(!name  || ! customAttributes || !branchId)
        {
            return res.json({
                success : false,
                message : "Please fill al details"
            })
        }
        const branchData  = await branch.findById(branchId)
       if(branchData)
       {
        branchData.name = name;
        branchData.customAttributes = customAttributes

        branchData.save()

        return res.status(200).json({
            success : true,
            message : 'Branch edited successfully'
        })
       }

       return res.status(500).json({
        success : true,
        message : 'Something went wrong'
    })

    } catch (err){
        console.log(err)
        return res.status(500).json({
            success : true,
            message : 'Error edting branch'
        })
    }
}
const deleteBranch = async(req,res)=>{
    try{

        const access = req.body.accessList.includes("DELETE_BRANCH")
        if(!access)
        {
            return res.status().json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
        const {organizationId,branchId} = req.params
        // const organizationData = await organization.findById(organizationId)

        const deleteBranch = await branch.findByIdAndDelete(branchId)
        if(deleteBranch)
        {
            const organizationData = await organization.findById(organizationId)
            const index = organizationData.branches.indexOf(branchId)
            organizationData.branches.splice(index,1)
            organizationData.save()
            return res.status(200).json({
                success : true,
                message : "Branch deleted successfully"
            })
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

const assignOrganization = async(req,res)=>{
    try{
        const access = req.body.accessList.includes("ASSIGN_ORGANIZATION_TO_BRANCH")
        if(!access)
        {
            return res.status().json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
        const {branchId,organizationId}=req.params
        const branchData = await branch.findById(branchId)
        const organizationData = await organization.findById(organizationId)

       if(branchData && organizationData)
       {
        branchData.Organization = organizationData._id
        const found = organizationData.branches.find((item)=>item.equals(branchData._id))
   if(!found)
   {
    organizationData.branches.push(branchData._id)
    organizationData.save()
    branchData.save()
   
   }
   return res.status(200).json({
    success : true,
    message :"Branch assigned to requested Organization"
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


const unassignOrganization = async(req,res)=>{
    try{

        const access = req.body.accessList.includes("REMOVE_BRANCH_FROM_ORGANIZATION")
        if(!access)
        {
            return res.status().json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
        const {branchId,organizationId}=req.params
        const branchData = await branch.findById(branchId)
        const organizationData = await organization.findById(organizationId)

       if(branchData && organizationData)
       {
        branchData.Organization =null;
        const index = organizationData.departments.indexOf(branchData._id)
        organizationData.branches.splice(index,1)
        branchData.save()
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

module.exports = {getBranch,addBranch,editBranch,deleteBranch,assignOrganization,unassignOrganization}