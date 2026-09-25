const Order = require("../model/Order");
const User = require("../model/User");
const Product = require("../model/Product");

const getAdminStats = async (req, res) => {
    try {
        const totalUser = await User.countDocuments({
            role: "user"
        });

        const totalOrder = await Order.countDocuments({});

        const totalProduct = await Product.countDocuments({});

        const orders = await Order.find({});

        const totalRevenue = orders.reduce(
            (acc, order) => acc + order.totalAmount,
            0
        );

        res.status(200).json({
            success: true,
            totalUser,
            totalOrder,
            totalProduct,
            totalRevenue
        });

    } catch (error) {
        res.status(500).json({
            message: "Error fetching stats",
            error: error.message
        });
    }
};

module.exports = {
    getAdminStats
};