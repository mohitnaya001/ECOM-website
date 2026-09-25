const User = require("../model/User");
const sendEmail = require("../utils/sendEmail");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    );
};

// Register User
const registerUser = async (req, res) => {
    const { name, email, password, phone } = req.body;

    try {
        // Validation
        if (!name || !email || !password || !phone) {
            return res.status(400).json({
                message: "Please enter name, email, password, and phone"
            });
        }

        // Check if user already exists with Email
        const existingEmail = await User.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({
                message: "Email is already registered"
            });
        }

        // Check if phone already exists
        const existingPhone = await User.findOne({ phone });
        if (existingPhone) {
            return res.status(400).json({
                message: "Phone number is already registered"
            });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate OTP
        const otp = Math.floor(1000 + Math.random() * 9000).toString();

        // OTP expires after 5 minutes
        const otpExpires = new Date(Date.now() + 5 * 60 * 1000);

        // Create user with phone
        const user = await User.create({
            name,
            email,
            phone,
            password: hashedPassword,
            otp,
            otpExpires,
            verified: false
        });

        // Send OTP Email
        const message = `Hello ${user.name},\n\nWelcome to ECOM_WEB!\n\nYour OTP for registration is: ${otp}\n\nThis OTP is valid for 5 minutes.\n\nDo not share this OTP with anyone.\n\nThank you,\nECOM_WEB Team`;

        await sendEmail(
            email,
            "Welcome to ECOM-WEB - Your OTP for Registration",
            message
        );

        // Response
        return res.status(201).json({
            message: "Registration successful. OTP sent to your email.",
            userId: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone
        });

    } catch (error) {
        console.error("Register Error:", error);
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Check if email & password are provided in request body
        if (!email || !password) {
            return res.status(400).json({ 
                message: "Please provide both email and password" 
            });
        }

        // 2. Fetch user with password field included explicitly
        const user = await User.findOne({ email }).select("+password");

        // 3. User check
        if (!user) {
            return res.status(400).json({ 
                message: "Invalid email or password" 
            });
        }

        // 4. Check if password exists in the DB document
        if (!user.password) {
            console.error(`Password missing in DB document for email: ${email}`);
            return res.status(400).json({ 
                message: "User account exists but has no password set. Please re-register this user." 
            });
        }

        // 5. Compare passwords safely
        const isMatch = await bcrypt.compare(String(password), String(user.password));
        if (!isMatch) {
            return res.status(400).json({ 
                message: "Invalid email or password" 
            });
        }

        // 6. Success response
        return res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            token: generateToken(user._id)
        });

    } catch (error) {
        console.error("Login Error:", error);
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};

// Get All Users
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select("-password");
        return res.json(users);
    } catch (error) {
        console.error("GetUsers Error:", error);
        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};


const verifyOTP = async (req, res) => {
    const { userId, otp } = req.body;

    try {

        if (!userId || !otp) {
            return res.status(400).json({
                message: "Please provide userId and OTP"
            });
        }

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.verified) {
            return res.status(400).json({
                message: "Email is already verified"
            });
        }

        // Check OTP
        if (user.otp !== String(otp)) {
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        // Check OTP expiry
        if (!user.otpExpires || user.otpExpires < new Date()) {
            return res.status(400).json({
                message: "OTP has expired. Please request a new OTP."
            });
        }

        // Verify user
        user.verified = true;

        // Remove OTP after verification
        user.otp = undefined;
        user.otpExpires = undefined;

        await user.save();

        // Generate JWT
        const token = generateToken(user._id);

        return res.status(200).json({
            message: "Email verified successfully",
            userId: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            verified: user.verified,
            token: token
        });

    } catch (error) {

        console.error("Verify OTP Error:", error);

        return res.status(500).json({
            message: "Server Error",
            error: error.message
        });
    }
};



module.exports = {
    registerUser,
    loginUser,
    getUsers,
    verifyOTP,
};