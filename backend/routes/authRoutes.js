const express = require('express')
const router = express.Router();
const {protect } = require('../middleware/authMiddleware')
const {admin} = require('../middleware/adminMiddelware')


const {registerUser, loginUser,verifyOTP, getUsers} = require("../controllers/authController")

router.post("/register", registerUser)
router.post("/login", loginUser);
router.post("/verifyOtp", verifyOTP);   
router.get("/users", protect, admin, getUsers)

module.exports = router;