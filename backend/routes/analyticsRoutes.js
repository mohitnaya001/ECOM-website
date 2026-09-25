const express = require('express')
const {protect} = require('../middleware/authMiddleware.js')
const {admin}= require('../middleware/adminMiddelware.js')
const {getAdminStats} = require('../controllers/analyticsController.js')
const router = express.Router()
router.get("/", protect , admin, getAdminStats)

module.exports = router;