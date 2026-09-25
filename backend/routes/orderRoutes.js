const express = require('express');

const { protect } = require('../middleware/authMiddleware');
const { admin } = require('../middleware/adminMiddelware');

const {
    createOrder,
    getOrders,
    myOrders,
    updateOrderStatus
} = require('../controllers/orderController');

const router = express.Router();
router.post('/', protect, createOrder);
router.get('/', protect, admin, getOrders);
router.get('/myorders', protect, myOrders);
router.put('/:id/status', protect, admin, updateOrderStatus);

module.exports = router;