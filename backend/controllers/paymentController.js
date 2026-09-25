const crypto = require("crypto");

const createOrder = async (req, res) => {
    try {
        const { amount } = req.body;

        if (!amount) {
            return res.status(400).json({
                message: "Amount is required"
            });
        }

        // Dummy order - Razorpay ke bina testing
        const order = {
            id: "order_test_" + Date.now(),
            amount: amount * 100,
            currency: "INR",
            receipt: crypto.randomBytes(10).toString("hex"),
            status: "created"
        };

        res.status(200).json(order);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const verifyPayment = async (req, res) => {
    try {
        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature
        } = req.body;

        // Dummy verification for testing
        if (
            razorpay_order_id &&
            razorpay_payment_id &&
            razorpay_signature
        ) {
            return res.status(200).json({
                message: "Payment verified successfully",
                success: true
            });
        }

        return res.status(400).json({
            message: "Payment verification failed",
            success: false
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    createOrder,
    verifyPayment
};