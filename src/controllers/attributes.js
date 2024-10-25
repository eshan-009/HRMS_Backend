const attributeSchema = require("../models/attributeSchema")

const getAttributes = async(req,res)=>{
    try{
     
        const {parent}=req.body
console.log("PARENT-------->>>>>",parent)
        const EmployeeAccess = req.body.accessList.includes("GET_EMPLOYEE_ATTRIBUTE")
        const organizationAccess = req.body.accessList.includes("GET_ORGANIZATION_ATTRIBUTE")
        const branchAccess = req.body.accessList.includes("GET_BRANCH_ATTRIBUTE")
        const departmentAccess = req.body.accessList.includes("GET_DEPARTMENT_ATTRIBUTE")
console.log("departmentAccess======>",departmentAccess)
        if((parent==="Employee" && !EmployeeAccess ) || (parent==="Organization" && !organizationAccess) || (parent==="SubOrganization" && !branchAccess) 
            || (parent==="Department" && !departmentAccess) )
        {
            return res.status().json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
        console.log("HERE1")
      const attributeData =  await attributeSchema.findOne({parent : parent})
      console.log("HERE2",attributeData)
   if(attributeData)
   {
    return res.status(200).json({
        success:true,
        message :"Attributes fetched successfully",
        data : attributeData
    })
   }
   return res.status(500).json({
    success : false,
    message :"Something went wrong!"
   })
   
    } catch(err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message :"Something went wrong!"
           })
    }
}
const addAttribute = async(req,res)=>{
    try{
        const {customAttribute,parent} =req.body
console.log(req.body)
        
        console.log({customAttribute,parent})
        if(!customAttribute || !parent)
            {
                return res.json({
                    success : false,
                    message : "Fill all details"
                })
            }

            const EmployeeAccess = req.body.accessList.includes("CREATE_EMPLOYEE_ATTRIBUTE")
        const organizationAccess = req.body.accessList.includes("CREATE_ORGANIZATION_ATTRIBUTE")
        const branchAccess = req.body.accessList.includes("CREATE_BRANCH_ATTRIBUTE")
        const departmentAccess = req.body.accessList.includes("CREATE_DEPARTMENT_ATTRIBUTE")

        if((parent==="Employee" && !EmployeeAccess ) || (parent==="Organization" && !organizationAccess) || (parent==="SubOrganization" && !branchAccess) 
            || (parent==="Department" && !departmentAccess) )
        {
            return res.status().json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }

        var attributeData = await attributeSchema.findOne({parent:parent})
        console.log("=======Here 1===========",attributeData)
         if(attributeData)
         {
             const attributeList = attributeData.attributeList
               if(!attributeList.includes(customAttribute))
               {
                   attributeList.push({title : customAttribute})
                  var result = await attributeData.save();
               }
              
             
              console.log("===========Here 2 ===========",attributeData)
         }
         else
         {
            result =   await attributeSchema.create({
                 parent : parent,
                 attributeList:[{title : customAttribute}]
             })
             console.log("===========Here 3 ===========",attributeData)
         }
         if(result)
         {
            return res.status(200).json({
                success :true,
                message :"Attributed added successfully"
              })
         }
         return res.status(200).json({
            success :false,
            message :"Failed to add Attribute"
          })
       
    } catch (err){
        console.log(err)
    }
}

const editAttribute = async(req,res)=>{
try{
    console.log("==========Edit================")
    const {attributeId} = req.params
    const {customAttribute,parent} =req.body
   console.log({customAttribute,parent},{attributeId})


    if(!customAttribute || !parent)
    {
        return res.json({
            success : false,
            message : "Fill all details"
        })
    }

    const EmployeeAccess = req.body.accessList.includes("UPDATE_EMPLOYEE_ATTRIBUTE")
    const organizationAccess = req.body.accessList.includes("UPDATE_ORGANIZATION_ATTRIBUTE")
    const branchAccess = req.body.accessList.includes("UPDATE_BRANCH_ATTRIBUTE")
    const departmentAccess = req.body.accessList.includes("UPDATE_DEPARTMENT_ATTRIBUTE")

    if((parent==="Employee" && !EmployeeAccess ) || (parent==="Organization" && !organizationAccess) || (parent==="SubOrganization" && !branchAccess) 
        || (parent==="Department" && !departmentAccess) )
    {
        return res.status().json({
            success : false,
            message : "Not Authorized to perform this action"
        })
    }

  const  attributeData = await attributeSchema.findOne({parent:parent})
  console.log(attributeData.attributeList)
let bool =false;
  attributeData.attributeList.map((item)=>{
    
    if(item._id==attributeId)
    {
        console.log("==========item=========",item._id==attributeId)
        item.title=customAttribute
        bool=true
       
    }
  })
  if(bool)
{
    attributeData.save()
    return res.status(200).json({
        success :true,
        message :"Attributed edited successfully"
      })
}

  return res.status(500).json({
    success :false,
    message :"Something went Wrong"
  })
} catch (err){
    console.log(err);
    return res.status(500).json({
        success :false,
        message :"Something weeeent Wrong"
      })
}
 
}
const deleteAttribute = async(req,res)=>{
    try{
        const {attributeId} = req.params
        const {parent} =req.body
// console.log({attributeId},{parent},req.body.accessList)

        const EmployeeAccess = req.body.accessList.includes("DELETE_EMPLOYEE_ATTRIBUTE")
        const organizationAccess = req.body.accessList.includes("DELETE_ORGANIZATION_ATTRIBUTE")
        const branchAccess = req.body.accessList.includes("DELETE_BRANCH_ATTRIBUTE")
        const departmentAccess = req.body.accessList.includes("DELETE_DEPARTMENT_ATTRIBUTE")

        if((parent==="Employee" && !EmployeeAccess ) || (parent==="Organization" && !organizationAccess) || (parent==="SubOrganization" && !branchAccess) 
            || (parent==="Department" && !departmentAccess) )
        {
            return res.status().json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
        // let bool = false;
       const attributeData =  await attributeSchema.findOne({parent:parent})
       console.log("attributeData",attributeData)
       attributeData.attributeList.map(async(item)=>{
        if(item._id.equals(attributeId))
        {
            const index = attributeData.attributeList.indexOf(item)
            attributeData.attributeList.splice(index,1)
            // bool = true;
            const result = await attributeData.save()

            if(result)
            {
                return res.status(200).json({
                    success : true,
                    message : "Attribute Deleted"
                })
            }
            else
            {
                return res.status(500).json({
                    success : false,
                    message :"Failed to Delete Attribute"
                   })
            }
        }
       })
      

   
     
    } catch(err){

        console.log(err)
        return res.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    }
}
module.exports = {getAttributes,addAttribute,editAttribute,deleteAttribute}