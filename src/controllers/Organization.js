
const branch = require("../models/branch");
const department = require("../models/department");
const organization = require("../models/organization");

const { uploadToCLoudinary } = require("../utilities/cloudinaryUploader");
const { addAttributes } = require("./attributes");
const cloudinary = require('cloudinary').v2


const getOrganizations = async(req,res)=>{
    try{
        const access = req.body.accessList.includes("GET_ALL_ORGANIZATIONS")
        if(!access)
        {
            return res.status(403).json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
       const page=parseInt(req.query.page)
       const limit=parseInt(req.query.limit)

        const orgData = await organization.find().skip((page-1)*limit).limit(limit);
        console.log(orgData)
      if(orgData && orgData.length>0)
      {
        return res.status(200).json({
            success :true,
            message :"Organization data fetched Succeessfully fetched",
            data : orgData
        })
      }
      else
      {
        return res.json({
            success :true,
            message :"No Data found !!",
           
        })
      }
    } catch (err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message :"Something went wrong"
        })
    }
}
const addOrganization = async(req,res)=>{
    try{
        const access = req.body.accessList.includes("ADD_ORGANIZATION")
        if(!access)
        {
            return res.status(403).json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
        const {name,description,customAttributes} = req.body
        const logo = req.files.logo
        console.log({name,description,customAttributes})
        if(!name || !description || !logo)
            {
                return res.json({
                    success : false,
                    message : "Please fill all details"
                })
            }
          
        const checkOrg = await organization.findOne({name:name})
           
        if(checkOrg)
            {
                return res.json({
                    success :  false,
                    message : `Organization with name : ${name} already exist`
                })
            }
            const image = await uploadToCLoudinary(logo,process.env.cloudinaryFolderName,100,100)
            console.log("Here",image.url)
          
           let addOrg;
            if(customAttributes &&  customAttributes.length>0)
            {
                 addOrg = await organization.create({
                    name:name,
                    description:description,
                    customAttributes : customAttributes,
                    logo : image.url
                })
            }
            else
            {
                 addOrg = await organization.create({
                    name:name,
                    description:description,
                    logo : image.url
                })
            }
          

       
        if(addOrg)
        {
            
            return res.status(200).json({
                success : true,
                  message : `Organization with name : ${name} successfully created`,
                data : addOrg
            })
            
            // customAttributes.map((item)=>{
            //     console.log(item)
            //     addOrg.customAttributes.push({title : item.title,value:item.value})
            // })
        }
        else{
            return res.json({
                success : false,
                message : `Error adding Organization ${name}`
            })
        }
          
      
    } catch (err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message : "Something went wrong"
            
        })
    }
}

const editOrganization = async(req,res)=>{
  try{
    const access = req.body.accessList.includes("UPDATE_ORGANIZATION")
        if(!access)
        {
            return res.status(403).json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
    const {name,description,customAttributes} = req.body
    const {organizationId} = req.params
    const logo = req.files.logo

    if(!name || !description || !organizationId || !logo)
    {
        return res.json({
            success : false,
            message : "Please fill all details"
        })
    }
    const image = await uploadToCLoudinary(logo,process.env.cloudinaryFolderName,100,100)

    const findOrg = await organization.findById(organizationId);
   if(findOrg)
   {
    const publicId = findOrg.logo.split("/").at(-1).split(".")[0]
    const del = await cloudinary.uploader.destroy(`${process.env.cloudinaryFolderName}/${publicId}`)
    // console.log("=======del======",findOrg.logo.split("/").at(-1).split(".")[0])
    // console.log("=======del=======",del,"========del=======")
   
    
    findOrg.name = name;
    findOrg.description.description;
        findOrg.customAttributes = customAttributes;
    
    findOrg.logo = image.url;

// console.log(image)
    const result = await findOrg.save();
if(result)
{
    return res.status(200).json({
        success:true,
        message : "Organization deatils updated sucessfully"
    })
}
else
{
    return res.json({
        success:false,
        message : "Error updating organization"
    })
}
    
   }
   return res.json({
    success:false,
     message : "Error updating organization"
})
  } catch (err){
    console.log(err);
    return res.status(500).json({
        success:false,
        message : "Something went wrong"
    })
  }

}

const deleteOrganization = async(req,res)=>{
    try{
        const access = req.body.accessList.includes("DELETE_ORGANIZATION")
        if(!access)
        {
            return res.status(403).json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
        const {organizationId} = req.params
        const orgData = await organization.findById(organizationId)
        
       
       
        if(orgData.branches && orgData.branches.length>0)
        {
            const branchData = await branch.find();
            branchData.map((item)=>{
                if(item.Organization===organizationId)
                {
                    item.Organization = null
                }
               })
         
               const branchResult = await branchData.save()
               if(!branchResult)
               {
                return res.status(500).json({
                    success : false,
                    message : "Something went wrong while removing branch from organization"
                })
               }

              
        }
        if(orgData.departments && orgData.departments>0)
        {
           
            const departmentData = await department.find()
            departmentData.map((item)=>{
             if(item.Organization===organizationId)
             {
                 item.Organization = null
             }
            })
     
            
            const departmentResult = departmentData.save()
            if(!departmentResult)
                {
                 return res.status(500).json({
                     success : false,
                     message : "Something went wrong while removing department from organization"
                 })
                }
        }
        
       

       const deleteOrganization = await organization.findByIdAndDelete(organizationId)

       if(deleteOrganization)
       {
        return res.status(200).json({
            success:true,
            message :"Organization deleted successfully"
           })
       }
       return res.status(500).json({
        success:false,
        message :"Error deleting organization"
       })
    } catch(err){
        console.log(err)
        return res.status(500).json({
            success:false,
            message :"Something went wrong"
           })
    }
}



module.exports = {getOrganizations,addOrganization,editOrganization,deleteOrganization}