
const skills = require("../models/skills")



const addSkill = async(req,res)=>{
try{
    const access = req.body.accessList.includes("ADD_SKILL")
    if(!access)
    {
        return res.status().json({
            success : false,
            message : "Not Authorized to perform this action"
        })
    }
    const{title} = req.body

const checkExisting = await skills.find({title:title})

if(checkExisting.length>0)
{
    return res.json({
        success : false,
        message : "Skill already exits"
    })
}

const addSkill = await skills.create({
    title : title
})
    if(addSkill)
    {
        return res.status(200).json({
            success : true,
            message :"Skill added successfully"
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

const editSkill = async(req,res)=>{
   try{
    const access = req.body.accessList.includes("UPDATE_SKILL")
    if(!access)
    {
        return res.status().json({
            success : false,
            message : "Not Authorized to perform this action"
        })
    }
    const {skillId} = req.params 
    const{title} =req.body

    const skillData = await skills.findById(skillId);
    skillData.title = title;

    const result = skillData.save()
    if(result)
    {
        return res.status(200).json({
            success : true,
            message : "Skill edited successfully"
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

const deleteSkill = async(req,res)=>{
try{
    const access = req.body.accessList.includes("DELETE_SKILL")
    if(!access)
    {
        return res.status().json({
            success : false,
            message : "Not Authorized to perform this action"
        })
    }
    const {skillId} = req.params 
    const skillData = await skills.findById(skillId)

    if(!skillData)
    {
        return res.json({
            success : false,
            message :"Skill doesnot exist"
        })
    }
const deleteSkill = await skills.findByIdAndDelete(skillId)

if(deleteSkill)
{
    return res.status(200).json({
        success : true,
        message : "Skill Deleted Successfully"
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

module.exports = {addSkill,editSkill,deleteSkill}