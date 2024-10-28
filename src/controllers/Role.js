const roles = require("../models/roles")

const getRolesData = async(req,res)=>{
    try
    {
        const access = req.body.accessList.includes("GET_ALL_ROLES")
        if(!access)
        {
            return res.status().json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)

        if(!page || !limit)
        {
            return res.json({
                success:false,
                message:"Send all query parameters"
            })
        }

        const roleData = await roles.find().skip((page-1)*limit).limit(limit)

        if(roleData)
        {
            return res.status(200).json({
                success : true,
                message : "Role list fetched Successfully",
                data : roleData
            })
        }
        return res.status(500).json({
            success:true,
            message:"Something Went Wrong"
        })
    } catch (err){
        console.log(err)

        return res.status(500).json({
            success:true,
            message:"Something Went Wrong"
        })
    }
}
const addRole = async(req,res)=>{
    try{
        const access = req.body.accessList.includes("ADD_ROLE")
        if(!access)
        {
            return res.status(403).json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
        const {title,roleAccessList} = req.body

        console.log({title,roleAccessList} )

const roleData = await roles.find({title:title})

if(roleData.length>0)
{
    return res.json({
        success:false,
        message : ` ${title} Role already exist`
    })
}

const createRole = await roles.create({
    title : title,
    accessList:roleAccessList
})

if(createRole)
{
    return res.status(200).json({
        success:true,
        message:` ${title} Role Created Successfully`,
        data : createRole
    })

}
return res.status(500).json({
    success:true,
    message:"Something Went Wrong"
})

    } catch(err){

        console.log(err)

        return res.status(500).json({
            success:true,
            message:"Something Went Wrong"
        })
    }
}

const editRole = async(req,res)=>{
   try{
    const access = req.body.accessList.includes("UPDATE_ROLE")
    if(!access)
    {
        return res.status().json({
            success : false,
            message : "Not Authorized to perform this action"
        })
    }
    const {roleId} = req.params
    const {title,roleAccessList} = req.body
    console.log({roleId},{title,roleAccessList})
    const roleData = await roles.findById(roleId)

    if(!roleData)
    {
        return res.json({
            success : false,
            message : "Role does not exist"
        })
    }
    roleData.title = title;
    roleData.accessList = roleAccessList
    const result = await roleData.save()
if(result)
{
    return res.status(200).json({
        success : true,
        message: "Role Edited Successfully"
    })
}
   
    return res.status(500).json({
        success : false,
        message : "Something went wrong"
    })
   } catch (err){
        console.log(err);
        return res.status(500).json({
            success : false,
            message : "Something went wrong"
        })
   }

}

const deleteRole = async(req,res)=>{
 try{
    const access = req.body.accessList.includes("DELETE_ROLE")
    if(!access)
    {
        return res.status().json({
            success : false,
            message : "Not Authorized to perform this action"
        })
    }
    const {roleId} = req.params
    const roleData = await roles.findById(roleId)

    if(!roleData)
    {
        return res.json({
            success : false,
            message : "Role does not exist"
        })
    }

  const deleteRole =   await roles.findByIdAndDelete(roleId)

   if(deleteRole)
   {
    return res.json({
        success : true,
        message:"Role Deleted Successfully"
    })
   }

    return res.status(500).json({
        success : false,
        message : "Something went wrong"
    })
 } catch(err){
    console.log(err)
    return res.status(500).json({
        success : false,
        message : "Something went wrong"
    })
 }
}

module.exports = {getRolesData,addRole,editRole,deleteRole}