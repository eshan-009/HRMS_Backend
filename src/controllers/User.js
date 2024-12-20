const user = require("../models/user")
const bcrypt = require('bcrypt');


const getUserById = async(req,res)=>{
    try
    {
      const {userId} = req.params
      const {currUserId} = req.body
      // console.log(currUserId,typeof userId)
      let userData;
      // console.log("here1",userId)
      if(userId!=="null")
      {
        // console.log("here2")
        userData =  await user.findById(userId).select("role").select("personalDetails").populate({
          path : "role",
          select : "title"
        }).populate("personalDetails").exec()
      }
      else
      {
        // console.log("here3")
        userData = await user.findById(currUserId).select("role").select("personalDetails").populate({
          path : "role",
          select : "title"
        }).populate("personalDetails").exec()
      }
  

   

      // console.log(userData)
      if(userData)
      {
        return res.status(200).json({
            success : true,
            message : "User data fetche successfully",
            data : userData
        })
      }
      else{
        return res.status(404).json({
            success : false,
            message : "User Not Found",
            
        })
      }

    } catch (err){
        return res.status(500).json({
            success : false,
            message : "Something went wrong",
            
        })
    }
}

const createUser = async(req,res)=>{
    try{
        const {email,password,role} = {email : "EshanSharma@hmail.com",password : "apple",role : "670e8149a59d7666b5918954"}
        const {organizationId} = {organizationId:"670633b03188966b599d682c"}

        const userData = await user.find({email:email})
        if(userData.length>0)
        {
          // console.log("ALREADY EXIST")
            // return res.json({
            //     success : false,
            //     message : "User already exist"
            // })
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
          // console.log("RESGITERED SUCCESSFULLY")
          // return  res.status(200).json({
          //       success : true,
          //       message : `${email} is registered successfully`
          //   })
        }
        // res.status(500).json({
        //     success : false,
        //     message : `Something went wrong`
        // })
    } catch (err){
        console.log(err);
        res.status(500).json({
            success : false,
            message : `Error registering user`
        })
    }
}

// const addPersonalDetails = async(req,res)=>{
//     try{
//         const {firstName,lastName,age,gender,

//         }=req.body
//         const profilePicture = req.files.profilePicture
//     } catch (err)
//     {
//         console.log(err)
//         res.status(500).json({
//             success : false,
//             message : `Error registering user`
//         })
//     }
// }

module.exports = {getUserById,createUser}



