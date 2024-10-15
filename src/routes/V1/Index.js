const express = require("express")
const { getTabData } = require("../../controllers/AsideTabs")
const { getFullAccessList } = require("../../controllers/getAccessList")
const router = express.Router()

router.use("/v1",require("./organizationRoutes"))
router.use("/v1",require("./attributeRoutes"))
router.use("/v1",require("./subOrganizationRoutes"))
router.use("/v1",require("./departmentRoutes"))
router.use("/v1",require("./roleRoutes"))
router.use("/v1",require("./employeeRoutes"))
router.use("/v1",require("./skillRoutes"))
router.use("/v1",require("./authRoutes"))


router.get("/v1/asideTabsData",getTabData)
router.get("/v1/fullAccessList",getFullAccessList)
module.exports = router