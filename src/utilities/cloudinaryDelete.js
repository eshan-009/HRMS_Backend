const cloudinary = require('cloudinary').v2

exports.deleteFromCloudinary = async(id)=>{
    console.log("=====Public=====",id,"======public=====")
  return await cloudinary.uploader.destroy(id)
  
}