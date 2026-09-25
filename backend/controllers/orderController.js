const Order = require('../model/Order');
const sendEmail = require('../utils/sendEmail');

// Create a new Order
const createOrder = async (req, res) => {
    try {
        const { items, totalAmount, address, paymentId } = req.body;

        if (!items || items.length === 0 || !totalAmount || !address) {
            return res.status(400).json({
                message: 'Invalid order data'
            });
        }

        const order = new Order({
            user: req.user._id,
            items,
            totalAmount,
            address,
            paymentId
        });

        await order.save();

        const message = `Dear ${req.user.name},

Thank you for your order!

Your order has been successfully created with the following details:

Order ID: ${order._id}
Total Amount: $${totalAmount}
Shipping Address: ${address}

We will notify you once your order is shipped.

Best regards,
Vadic Team`;

        await sendEmail(
            req.user.email,
            'Order Created',
            message
        );

        res.status(201).json({
            message: 'Order created successfully',
            order
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error creating order',
            error: error.message
        });
    }
};


// Get My Orders
const myOrders = async (req, res) => {
    try {
        const orders = await Order.find({
            user: req.user._id
        }).populate(
            'items.product',
            'name price'
        );

        res.json(orders);

    } catch (error) {
        res.status(500).json({
            message: 'Error fetching orders',
            error: error.message
        });
    }
};


// Get All Orders - Admin
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('user', 'name email');

        res.json(orders);

    } catch (error) {
        res.status(500).json({
            message: 'Error fetching orders',
            error: error.message
        });
    }
};


// Update Order Status
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({
                message: 'Order not found'
            });
        }

        order.status = status;

        await order.save();

        res.json({
            message: 'Order status updated successfully',
            order
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error updating order status',
            error: error.message
        });
    }
};


module.exports = {
    createOrder,
    myOrders,
    getOrders,
    updateOrderStatus
};