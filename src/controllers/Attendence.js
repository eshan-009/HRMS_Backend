const attendence = require("../models/attendence")


const addTiming = async(req,res)=>{
    try{
        const access = req.body.accessList.includes("ADD_ATTENDANCE_TIMING")
        if(!access)
            {
                return res.status(400).json({
                    success : false,
                    message : "Not Authorized to perform this action"
                })
            }

            const {hours,minutes} = req.body

            const data = await attendence.findOne()
         
  console.log(data.timing.hours)

           if(data.timing.hours)
           {
            
            return res.status(400).json({
                success : false,
                message : "Timing Already Exist"
            })
    
           }
if(!data)
{
    const timeData = await attendence.create({
        timing : {
            hours : hours,
            minutes : minutes
        }
       })

       if(timeData)
       {
        return res.status(200).json({
            success : true,
            message : "Timing added Successfully"
        })
       }
}
else{
    data.timing.hours = hours
    data.timing.minutes = minutes
    const result = await data.save()

    if(result)
        {
         return res.status(200).json({
             success : true,
             message : "Timing added Successfully"
         })
        }
}
        
           return res.json({
            success : false,
            message : "Failed To Add Timing"
        })

    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    }
}

const editTiming = async(req,res)=>{
    try{
        const access = req.body.accessList.includes("UPDATE_ATTENDANCE_TIMING")
        if(!access)
            {
                return res.status(400).json({
                    success : false,
                    message : "Not Authorized to perform this action"
                })
            }
            const {attendenceId} = req.params
            const {hours,minutes} = req.body
            console.log("DATA",attendenceId)

            const data = await attendence.findById(attendenceId)
           if(!data)
           {
            return res.json({
                success : false,
                message : "Data Not found"
            })
           }
           const timingData = data?.timing
         
           timingData.hours = hours
           timingData.minutes = minutes

           const result = data.save()
       

           if(result)
           {
            return res.status(200).json({
                success : true,
                message : "Timing Edited Successfully"
            })
           }
           return res.json({
            success : false,
            message : "Failed To Edit Timing"
        })
    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success : false,
            message : "Something went wrong"
        })
    }
}

const deleteTiming = async(req,res)=>{
    try{
        const access = req.body.accessList.includes("DELETE_ATTENDANCE_TIMING")
        if(!access)
            {
                return res.status().json({
                    success : false,
                    message : "Not Authorized to perform this action"
                })
            }

            const {attendenceId} = req.params
         

            const data = await attendence.findById(attendenceId)
            const timingData = data?.timing
           if(!timingData)
           {
            return res.json({
                success : false,
                message : "Data Not found"
            })
           }
           timingData.hours = null
           timingData.minutes = null
           const result =     await data.save()

           if(result)
           {
            return res.status(200).json({
                success : true,
                message : "Timing Deleted successfully"
               })
           }


          return res.json({
            success : false,
                message : "Failed to delete timing"
               })


    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success : false,
            message : "Something went wrong"
        })
        
    }
}

const addLocation = async(req,res)=>{
    try{
        const access = req.body.accessList.includes("ADD_ATTENDANCE_LOCATION")
        if(!access)
            {
                return res.status().json({
                    success : false,
                    message : "Not Authorized to perform this action"
                })
            }
            const {name,longitude,latitude} = req.body
           
            const data = await attendence.findOne()
            // console.log({name,longitude,latitude},data)
            let result;
            if(!data)
            {
                result = await attendence.create({
                    locations : [{name:name,longitude : longitude,latitude : latitude}]
                })

               
            }
            else
            {
                const locationData =data?.locations
                const newData = {
                    name: name,
                    longitude : longitude,
                    latitude : latitude
                }
                locationData.push(newData)
                result = await data.save()

            }

             

             if(result)
                {
                    return res.status(200).json({
                        success : true,
                        message : "Location added successfully",
                    })
                }
                return res.json({
                    success : false,
                    message : "Failed to add location",
                })

           

    } catch(err) {
        console.log(err)
        return res.status(500).json({
            success : false,
            message : "Something went wrong",
        })
    }
}

const editLocation = async(req,res)=>{
    try{
        const access = req.body.accessList.includes("UPDATE_ATTENDANCE_LOCATION")
        if(!access)
            {
                return res.status().json({
                    success : false,
                    message : "Not Authorized to perform this action"
                })
            }
            const {locationId,attendenceId} = req.params
            const {name,longitude,latitude} = req.body
            // console.log({locationId,attendenceId,name,longitude,latitude})
            const data = await attendence.findById(attendenceId)

            const locationData = data?.locations
            const index = locationData.findIndex((item)=>item?._id.equals(locationId))
            if(index!==-1)
            {
                const required = locationData[index]
                required.name = name,
                required.longitude = longitude
                required.latitude = latitude

                const result = await data.save()

                if(result)
                {
                    return res.status(200).json({
                        success : true,
                        message : "Location edited successfully"
                    })
                }
            }
            else if(index==-1)
            {
                return res.json({
                    success : false,
                    message : "Location not found"
                })
            }

            return res.json({
                success : false,
                message : "Could not edit location"
            })


    } catch(err) {
        console.log(err)
        return res.json(500).json({
            success : false,
            message : "Something went wrong"
        })
    }
}

const deleteLocation = async(req,res)=>{
    try{
        const access = req.body.accessList.includes("DELETE_ATTENDANCE_LOCATION")
        if(!access)
            {
                return res.status().json({
                    success : false,
                    message : "Not Authorized to perform this action"
                })
            }

            const {locationId,attendenceId} = req.params
   
            const data = await attendence.findById(attendenceId)

            const locationData = data?.locations
            const index = locationData.findIndex((item)=>item._id.equals(locationId))
            if(index!==-1)
            {
               locationData.splice(index,1)

                const result = await data.save()

                if(result)
                {
                    return res.status(200).json({
                        success : true,
                        message : "Location Deleted successfully"
                    })
                }
            }
            else if(index==-1)
            {
                return res.json({
                    success : false,
                    message : "Location not found"
                })
            }

            return res.json({
                success : false,
                message : "Could not delete location"
            })
    } catch(err) {
        console.log(err)
    }
}

const getAttendenceData = async(req,res)=>{
    try{
        const access = req.body.accessList.includes("GET_ATTENDENCE_DATA")
        if(!access)
            {
                return res.status().json({
                    success : false,
                    message : "Not Authorized to perform this action"
                })
            }

            const data = await attendence.findOne()

            if(data)
            {
                return res.status(200).json({
                    success : true,
                    message : "Attendence Data fetched successfully",
                    data : data
                })
            }
            else{
                return res.json({
                    success : false,
                    message : "NO Data Found",
                    data : data
                })
            }
    } catch(err) {
        console.log(err)
    }
}

module.exports = {getAttendenceData,addTiming,addLocation,editTiming,editLocation,deleteTiming,deleteLocation}