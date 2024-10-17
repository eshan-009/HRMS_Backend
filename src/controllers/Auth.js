
const user = require("../models/user")
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken")




const login = async(req,res)=>{
   try
   {
    
    const {email,password} = req.body;
    const checkUser = await user.findOne({email : email})
  
    if(!checkUser)
    {
        return res.json({
            success: false,
            message :"User does not exist"
        })
    }
    
   let hashedPassword = checkUser.password;

   if(await bcrypt.compare(password,hashedPassword))
   {
    const payload = {
        userId : checkUser._id
    }
    const token = jwt.sign(payload,process.env.JWT_SECRET)

    return res.status(200).json({
        success :true,
        message : "Logged in successfully",
        token : token
    })
   }
   } catch (err){
    console.log(err)
    return res.status(500).json({
        success : false,
        message :"Error Logging in!!! Try Again"
    })
   }

    
}

module.exports = {login}

// const signUp = async(req,res)=>{
//     try{
//         const {organizationId,email,password,role} =req.body

//         const userData = await user.findOne({email:email})
//         if(userData)
//         {
//             return res.json({
//                 success : false,
//                 message : "User already exist"
//             })
//         }
//         let hashedPassword = await bcrypt.hash(password,10)
//         const addUser = await user.create({
//             email : email,
//             password : hashedPassword,
//             organization : organizationId,
//             role : role
//         })

//         if(addUser)
//         {
//           return  res.status(200).json({
//                 success : true,
//                 message : `${email} is registered successfully`
//             })
//         }
       
//     } catch (err){
//         console.log(err);
//         res.status(500).json({
//             success : false,
//             message : `Error registering user`
//         })
//     }
// }