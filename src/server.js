const express = require("express");
const dbConnect = require("./config/database");
const { cloudinaryConfig } = require("./config/cloudinary");
const fileUpload = require("express-fileupload");
// const { createFullAccessList } = require("./controllers/getAccessList");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 4000
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(express.json())
app.use("/api",require("./routes/V1/Index"))
cloudinaryConfig();
dbConnect();
app.listen(PORT,()=>{
    console.log("Server Connected Successfully")
})

