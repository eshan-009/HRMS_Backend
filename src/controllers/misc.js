const user = require("../models/user")
const bcrypt = require('bcrypt');


const createUser = async(req,res)=>{
    try{
        const {email,password,role} =req.body
        const {organizationId} = req.params

        const userData = await user.find({email:email})
        if(userData.length>0)
        {
            return res.json({
                success : false,
                message : "User already exist"
            })
        }
        let hashedPassword = await bcrypt.hash(password,10)

        const addUser = await user.create({
            email : email,
            password : hashedPassword,
            organization : organizationId,
            role : role
        })

        if(addUser)
        {
          return  res.status(200).json({
                success : true,
                message : `${email} is registered successfully`
            })
        }
        res.status(500).json({
            success : false,
            message : `Something went wrong`
        })
    } catch (err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : `Error registering user`
        })
    }
}

const addPersonalDetails = async(req,res)=>{
    try{
        const {firstName,lastName,age,gender,

        }=req.body
        const profilePicture = req.files.profilePicture
    } catch (err)
    {
        console.log(err)
        res.status(500).json({
            success : false,
            message : `Error registering user`
        })
    }
}

module.exports = {createUser}



