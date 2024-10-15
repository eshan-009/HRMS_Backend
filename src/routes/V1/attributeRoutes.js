const express = require("express")
const { editAttribute, addAttribute, deleteAttribute, getAttributes } = require("../../controllers/attributes")
const { auth } = require("../../middleware/auth")
const router = express.Router()

router.post("/addAttribute",auth,addAttribute)
router.patch("/editAttribute/:attributeId",auth,editAttribute)
router.delete("/deleteAttribute/:attributeId",auth,deleteAttribute)

router.get("/getCustomAttributes",auth,getAttributes)
module.exports = router