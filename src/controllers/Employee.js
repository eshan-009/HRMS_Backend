const additionalDetails = require("../models/additionalDetails");
const department = require("../models/department");
const organization = require("../models/organization");
const profile = require("../models/profile");
const user = require("../models/user");
const { deleteFromCloudinary } = require("../utilities/cloudinaryDelete");
const { uploadToCLoudinary } = require("../utilities/cloudinaryUploader");
const bcrypt = require("bcrypt")

const getEmployees = async(req,res)=>{
  try{
    const access = req.body.accessList.includes("GET_ALL_EMPLOYEES")
    if(!access)
    {
        return res.status().json({
            success : false,
            message : "Not Authorized to perform this action"
        })
    }
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)

    const employeeData = await user.find().skip((page-1)*limit).limit(limit)

    if(employeeData)
    {
      return res.status(200).json({
        success :true,
        message  :"Employee list fetched successfully",
        employeeData:employeeData
        
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

const getEmployeesByDepartment = async(req,res)=>{
  try{
   
    const access = req.body.accessList.includes("GET_EMPLOYEES_BY_DEPARTMENT")
    if(!access)
    {
     
        return res.json({
            success : false,
            message : "Not Authorized to perform this action"
        })
    }
    const page = parseInt(req.query.page)
    const limit = parseInt(req.query.limit)
    const {departmentId} = req.params
    const departmentData = await department.findById(departmentId).select("employees").populate({
      path : "employees",
      select : "personalDetails",
      options : {
        skip : (page-1)*limit,
        limit : limit
      },
      populate :{
        path : "personalDetails"
      }
    }).exec()

const employeeData = departmentData.employees
    if(employeeData)
    {
      return res.status(200).json({
        success :true,
        message  :"Employee list fetched successfully",
        employeeData:employeeData
        
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
const getEmployeebyname = async(req,res)=>{
  try{
    const access = req.body.accessList.includes("GET_EMPLOYEES_BY_NAME")
    if(!access)
    {
        return res.status().json({
            success : false,
            message : "Not Authorized to perform this action"
        })
    }
    const {name} = req.body
    const firstName = name.split(" ")[0]
    const lastName = name.split(" ")[1]
    
    var personaldetails;

if(firstName && lastName)
{
   personaldetails = await profile.find({

    firstName: { $regex: firstName, $options: 'i' } ,
    lastName: { $regex: lastName, $options: 'i' } 
  
})
}
else{
   personaldetails = await profile.find({

    firstName: { $regex: name, $options: 'i' }
  
})
}
   

    if(personaldetails.length>0)
    {
      return res.status(200).json({
        success :true,
        message  :"Employee list fetched successfully",
        data:personaldetails
        
      })
    }
    return res.status(500).json({
      success : false,
      message : "No Data Found"
    })

  } catch (err){
    console.log(err)
    return res.status(500).json({
      success : false,
      message : "Something went wrong"
    })
  }
}

const getEmployeebyPDetailId = async(req,res)=>{
  try{
    const access = req.body.accessList.includes("GET_EMPLOYEES_BY_NAME")
    if(!access)
    {
        return res.status().json({
            success : false,
            message : "Not Authorized to perform this action"
        })
    }
    const {pDetailId} = req.params
const userData = await user.find({personalDetails : pDetailId }).populate("personalDetails").exec()   

    if(userData.length>0)
    {
      return res.status(200).json({
        success :true,
        message  :"Employee Details fetched successfully",
        data:userData
        
      })
    }
    return res.status(500).json({
      success : false,
      message : "No Data Found"
    })

  } catch (err){
    console.log(err)
    return res.status(500).json({
      success : false,
      message : "Something went wrong"
    })
  }
}

const addEmployee = async (req,res) => {
  try {
    const access = req.body.accessList.includes("ADD_EMPLOYEE")
        if(!access)
        {
            return res.status().json({
                success : false,
                message : "Not Authorized to perform this action"
            })
        }
    const { email, password } = req.body;
    const {organizationId,roleId} = req.params

    if (!email || !password || !organizationId || !roleId) {
      return res.json({
        success: false,
        message: "Please fill all data",
      });
    }
    const checkEmployee = await user.find({ email: email });
    if (checkEmployee.length>0) {
      return res.json({
        success: false,
        message: "User Already exist",
      });
    }
    let hashedPassword = await bcrypt.hash(password,10)
    const addEmployee = user.create({
      email: email,
      password: hashedPassword,
      organization: organizationId,
      role: roleId,
    });

    if(addEmployee)
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
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success : false,
      message : `Something went wrong`
  })
  }
};

const addEmployeePersonalDetails = async (req,res) => {
  try {
    const access = req.body.accessList.includes("ADD_EMPLOYEE_PERSONAL_DETAILS")
    if(!access)
    {
        return res.status().json({
            success : false,
            message : "Not Authorized to perform this action"
        })
    }
    const {
      firstName,
      lastName,
      age,
      gender,
      department,
      dateOfBirth,
      skills,
      designation,
      customAttributes
    } = req.body;

    console.log({
      firstName,
      lastName,
      age,
      gender,
      department,
      dateOfBirth,
      skills,
      designation,
      customAttributes
    })
    const { userId } = req.params;
    const profilePicture = req.files.profilepicture;

    if (
      !firstName ||
      !lastName ||
      !age ||
      !gender ||
      !department ||
      !customAttributes ||
      !dateOfBirth ||
      !skills ||
      !designation 
      || !profilePicture
    ) {
      return res.json({
        success: false,
        message: "Please fill all details",
      });
    }

    const dp = await uploadToCLoudinary(
      profilePicture,
      process.env.cloudinaryFolderName,
      100,
      100
    );

    const employeePersonal = await profile.create({
      firstName: firstName,
      lastName: lastName,
      age: age,
      gender: gender,
      profilePicture: dp.url,
      employeeCode: `${
        firstName[0] + firstName[1] + firstName.at(-1) + Date.now()
      }`,
      department: department,
      customAttributes: customAttributes,
      dateOfBirth: dateOfBirth,
      skills: skills,
      designation: designation,
    });

    const userData = await user.findById(userId);
    userData.personalDetails = employeePersonal._id;
    const result = userData.save()
    if(result)
    {
      return res.status(200).json({
        success: true,
        message: "Personal Deatils successfully added",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Error adding employee persoal details",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error adding employee persoal details",
    });
  }
};
const addemployeeAdditionalDetails = async (req, res) => {
  try {

    const access = req.body.accessList.includes("ADD_EMPLOYEE_ADDITIONAL_DETAILS")
    if(!access)
    {
        return res.status().json({
            success : false,
            message : "Not Authorized to perform this action"
        })
    }
    const {
      contact,
      relationShip,
      addressType,
      propertyNumber,
      city,
      zipCode,
      state,
      country,
      bankName,
      accountNumber,
      ifscCode,
      bankBranch,
    } = req.body;
    const { userId } = req.params;

   
    if (
      !contact ||
      !relationShip ||
      !addressType ||
      !propertyNumber ||
      !city ||
      !zipCode ||
      !state ||
      !country ||
      !bankName ||
      !accountNumber ||
      !ifscCode ||
      !bankBranch
    ) {
      return res.json({
        success: false,
        message: "Please Fill all details",
      });
    }
    const addDetails = await additionalDetails.create({
      emergencyContact: {
        contact: contact,
        relationShip: relationShip,
      },
      addressDetails: {
        addressType: addressType,
        propertyNumber: propertyNumber,
        city: city,
        zipCode: zipCode,
        state: state,
        country: country,
      },
      bankDetails: {
        bankName: bankName,
        accountNumber: accountNumber,
        ifscCode: ifscCode,
        bankBranch: bankBranch,
      },
    });

    const userData = await user.findById(userId);
    userData.additionalDetails = addDetails._id;
    const result = userData.save()
    if(result)
    {
      return res.status(200).json({
        success: true,
        message: "Additional Deatils successfully added",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Error adding employee additional details",
    });

  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Error adding employee additional details",
    });
  }
};


const editEmployeePersonalDetails = async(req,res)=>{
    try{
      const access = req.body.accessList.includes("UPDATE_EMPLOYEE_PERSONAL_DETAILS")
      if(!access)
      {
          return res.status().json({
              success : false,
              message : "Not Authorized to perform this action"
          })
      }
        const {
            firstName,
            lastName,
            age,
            gender,
            employeeCode,
            department,
            aadharNumber,
            dateOfBirth,
            customAttributes,
            skills,
            designation,
          } = req.body;
          console.log(req.body)
          const { userId } = req.params;
          const newImage = req.files.newImage;

          if (
            !firstName ||
            !lastName ||
            !age ||
            !gender ||
            !department ||
            !aadharNumber ||
            !dateOfBirth ||
          !customAttributes||
            !skills ||
            !designation || !newImage || !userId || !personalData
          ) {
            return res.json({
              success: false,
              message: "Please fill all details",
            });
          }
      
     

        const newDP = await uploadToCLoudinary(newImage,process.env.cloudinaryFolderName,100,100)
        const userData = await user.findById(userId).select("personalDetails").populate("personalDetails").exec();
        if(!userData)
        {
            return res.json({
                success:false,
                message:"User does not exist"
            })
        }
        const personalData = userData.personalDetails;

        const publicId =  `${process.env.cloudinaryFolderName}/${personalData.profilePicture.split("/").at(-2)}`
        console.log("====PUBLIC ID---->>>",personalData)
        const deleteFromCloudinary = await cloudinary.uploader.destroy(publicId)
        if(!deleteFromCloudinary)
        {
          return res.status(500).json({
            success : false,
            message : "Something went wrong! Try Again"
          })
        }
        personalData.firstName = firstName
        personalData.lastName = lastName
        personalData.age = age
        personalData.gender = gender
        personalData.department = department
        personalData.aadharNumber = aadharNumber
        personalData.employeeCode=employeeCode
        personalData.profilePicture = newDP.url
        personalData.dateOfBirth = dateOfBirth
        personalData.skills = skills
        personalData.designation = designation
        personalData.customAttributes = customAttributes

        const result = personalData.save()
        if(result)
        {
          return res.status(200).json({
            success : true,
            message : "Employee Personal details edited successfully",
            personalData : personalData
          })
        }
        return res.status(500).json({
          success : false,
          message : "Error editing Personal details"
      })
    } catch (err){
        console.log(err)
        return res.status(500).json({
            success : false,
            message : "Error editing Personal details"
        })
    }
}

const editEmployeeAdditionalDetails = async (req, res) => {
  try {
    const access = req.body.accessList.includes("UPDATE_EMPLOYEE_ADDITIONAL_DETAILS")
    if(!access)
    {
        return res.status().json({
            success : false,
            message : "Not Authorized to perform this action"
        })
    }
    const { userId } = req.params;

    const {
        contact,
        relationShip,
        addressType,
        propertyNumber,
        city,
        zipCode,
        state,
        country,
        bankName,
        accountNumber,
        ifscCode,
        bankBranch,
      } = req.body;
    console.log(req.body)

      if (
        !contact ||
        !relationShip ||
        !addressType ||
        !propertyNumber ||
        !city ||
        !zipCode ||
        !state ||
        !country ||
        !bankName ||
        !accountNumber ||
        !ifscCode ||
        !bankBranch
      ) {
        return res.json({
          success: false,
          message: "Please Fill all details",
        });
      }

    const userData = await user.findById(userId).select("additionalDetails").populate("additionalDetails").exec();
if(!userData)
{
    return res.json({
        success:false,
        message:"User does not exist"
    })
}
  

    const addOnDetails = userData.additionalDetails;


    addOnDetails.emergencyContact.contact = contact 
    addOnDetails.emergencyContact.relationShip = relationShip
    addOnDetails.addressDetails.addressType = addressType
    addOnDetails.addressDetails.propertyNumber =propertyNumber
    addOnDetails.addressDetails.city = city
    addOnDetails.addressDetails.zipCode = zipCode
    addOnDetails.addressDetails.state = state
    addOnDetails.addressDetails.country = country
    addOnDetails.bankDetails.bankName = bankName
    addOnDetails.bankDetails.accountNumber = accountNumber
    addOnDetails.bankDetails.ifscCode = ifscCode
    addOnDetails.bankDetails.bankBranch = bankBranch

    const result =  await addOnDetails.save();

   
if(result)
{
  return res.status(200).json({
    success : true,
    message : "Personal details edited successfully",
  
})
}
return res.status(500).json({
  success : false,
  message : "Something went wrong"
})
    
  } catch (err) {
    console.log(err);
    return res.status(500).json({
        success : false,
        message : "Error editing personal details"
    })
  }
};

const deleteEmployee = async(req,res)=>{
    try{
      const access = req.body.accessList.includes("DELETE_EMPLOYEE")
      if(!access)
      {
          return res.status().json({
              success : false,
              message : "Not Authorized to perform this action"
          })
      }
        const {userId} = req.params
      if(!userId)
      {
        return res.json({
          success : false,
          message :"User Id required"
        })
      }
      const userData = await user.findById(userId).select("additionalDetails personalDetails").populate("personalDetails").exec()  
      const departmentId = userData.personalDetails.department
      const departmentData = await department.findById(departmentId)
      const found = departmentData.employees.find((item)=>item.equals(userData._id))
      if(found)
      {
        const index = departmentData.employees.indexOf(found)
        departmentData.employees.splice(index,1)
      }

  const delFromDepartment = await departmentData.save()
   const deleteProfile =  await profile.findByIdAndDelete(userData.personalDetails)
   const deleteAddOn =  await additionalDetails.findByIdAndDelete(userData.additionalDetails)
   const deleteUser =  await user.findByIdAndDelete(userId)

   if(deleteProfile && deleteAddOn && deleteUser && delFromDepartment)
   {
    return res.status(200).json({
      success : true,
      message : "Employee Deleted Successfully"
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
            message : "Error deleting employee"
        })
    }
}

const assignDepartmentToEmployee = async(req,res)=>{
  try{
    const access = req.body.accessList.includes("ASSIGN_DEPARTMENT_TO_EMPLOYEE")
    if(!access)
    {
        return res.status().json({
            success : false,
            message : "Not Authorized to perform this action"
        })
    }
    const {userId,departmentId} = req.params
    console.log({userId,departmentId})
      if(!userId || !departmentId)
      {
        return res.json({
          success : false,
          message :"UserID and DepartmentID required"
        })
      }

      const userData = await user.findById(userId).select("personalDetails").populate("personalDetails").exec();
      const departmentData = await department.findById(departmentId)
console.log(departmentData._id)
      if(userData && departmentData)
      {
        userData.personalDetails.department = departmentData._id
        const result1 = await userData.personalDetails.save()
        const found = departmentData.employees.find((item)=>item.equals(userData._id))
        console.log("FOUNDDD",found)
        if(!found)
        {
          departmentData.employees.push(userData._id)
        }

     
        const result2 = await departmentData.save()
        if(result1 && result2)
        {
          return res.status(200).json({
            success : true,
            message :"Department assigned to Employee",
            result1:result1
          })
        }
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

const unAssignDepartmentToEmployee = async(req,res)=>{
  try{
    const access = req.body.accessList.includes("REMOVE_EMPLOYEE_FROM_DEPARTMENT")
    if(!access)
    {
        return res.status().json({
            success : false,
            message : "Not Authorized to perform this action"
        })
    }
    const {userId,departmentId} = req.params
      if(!userId || !departmentId)
      {
        return res.json({
          success : false,
          message :"UserID and DepartmentID required"
        })
      }

      const userData = await user.findById(userId).select("personalDetails").populate("personalDetails").exec();
      const departmentData = await department.findById(departmentId)

      if(userData && departmentData)
      {
        userData.personalDetails.department = null
        const found = departmentData.employees.find((item)=>item.equals(userData._id))
       if(found)
       {
        const index = departmentData.employees.indexOf(found)

        departmentData.employees.splice(index,1)
       }

        const result1 = await userData.personalDetails.save()
        const result2 = await departmentData.save()

        if(result1 && result2)
        {
          return res.status(200).json({
            success : true,
            message :"Department Unassigned",
           
          })
        }
      
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

module.exports = {getEmployees,getEmployeesByDepartment,getEmployeebyname,getEmployeebyPDetailId,addEmployee,deleteEmployee,addEmployeePersonalDetails,
  addemployeeAdditionalDetails,editEmployeePersonalDetails,
  editEmployeeAdditionalDetails,assignDepartmentToEmployee,
  unAssignDepartmentToEmployee
}