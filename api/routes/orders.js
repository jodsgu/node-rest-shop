const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const productSchema = require('../models/products');
//model create
const Product = new mongoose.model('Product', productSchema);

const orderSchema = require('../models/order');
//model create
const Order = new mongoose.model('Order', orderSchema);
const checkLogin = require('../middlewares/checkLogin');

const ordersController = require('../controller/order');

//get list of Orders
router.get('/',checkLogin,ordersController.order_get_all)

//Create order 
router.post('/',ordersController.create_order)

//fetch order by ID
router.get('/:orderId',ordersController.fetchOderById)

//Update order by ID
router.patch('/:orderId', ordersController.updateById)

//Delete order by ID
router.delete('/:orderId', ordersController.delete)


module.exports = router;
