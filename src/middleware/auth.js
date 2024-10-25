const jwt = require("jsonwebtoken")
const user = require("../models/user")
const fullAccessList = require("../models/fullAccessList")

const auth = async(req,res,next)=>{
try{
  
    // console.log(req.body)
    const token =  req.header("Authorization").replace("Bearer ","")
  console.log("REQ",req.body)
    if(!token)
    {
        return res.status(400).json({
            success : false,
            message  : "Token  not found"
        })
    }
    console.log("Here1")
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        if(!decode)
        {
            return res.status(403).json({
                success : false,
                message  : "Could Not Authenticate user"
            })
        }
        console.log("Here2")
            const currUserId = decode.userId

            const userData = await user.findById(currUserId).select("role").populate("role").exec()
            const accessList = userData.role.accessList
            req.body.currUserId = currUserId
            req.body.accessList = accessList
            console.log(accessList)
            
    next()
} catch  (err){
console.log(err)
return res.status(500).json({
    success : false,
    message : 'Something went wrong'
})
}
}

module.exports = {auth}