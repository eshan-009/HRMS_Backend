const jwt = require("jsonwebtoken")
const user = require("../models/user")

const auth = async(req,res,next)=>{
try{
    const token = req.body.token || req.header("Authorization").replace("Bearer ","")
   
    if(!token)
    {
        return res.status(400).json({
            success : false,
            message  : "Token  not found"
        })
    }
   
        const decode = jwt.verify(token,process.env.JWT_SECRET)
        if(!decode)
        {
            return res.status(403).json({
                success : false,
                message  : "Could Not Authenticate user"
            })
        }
            const currUserId = decode.userId

            const userData = await user.findById(currUserId).select("role").populate("role").exec()
            const accessList = userData.role.accessList
            req.body.currUserId = currUserId
            req.body.accessList = accessList
        
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