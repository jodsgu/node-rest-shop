const mongoose = require('mongoose');
const productSchema = require('../models/products');
//model create
const Product = new mongoose.model('Product', productSchema);

const orderSchema = require('../models/order');
//model create
const Order = new mongoose.model('Order', orderSchema);

exports.order_get_all = async (req, res, next) => {
  try{
    
    const hostName = `${process.env.HOSTNAME}${req.baseUrl}`;
    //console.log(hostName);
    const order = await Order.find()
      .populate('product','name price _id')
      .select('product quantity _id');
    if (order.length > 0) {
      res.status(200).json({
        count: order.length,
        orders: order.map(Neworder => {
          return {
            _id: Neworder._id,
            quantity: Neworder.quantity,
            product: Neworder.product,
            request: {
              type: 'GET',
              url:`${hostName}/${Neworder._id}` 
             // url: 'localhost:5000/orders/' + Neworder._id
            }
          }
        })
      })
    } else {
      res.status(200).json({
        status: 'Ok',
        message: "There is no Order found ",


      })
    }
  }catch(err){
    res.status(500).json({
      message: err.message,
      error: "There is a server side error"

    })
  }
  
}


exports.create_order = async (req, res, next) => {
  try{
    const order = new Order({
      _id: new mongoose.Types.ObjectId(),
      product: req.body.product,
      quantity : req.body.quantity
    })

    const checkProduct = await Product.findById(req.body.product);
    if(checkProduct){
        const saveOrder = await order.save();
        res.status(201).json({
          message: "Created order sucessfully",
          createdOrder:{
            product: saveOrder.product,
            quantity: saveOrder.quantity,
            _id: saveOrder._id,
            request:{
              type:'GET',
              url: 'localhost:5000/orders/' + saveOrder._id
            }

        }
      })
    }else{
      res.status(404).json({
        message: "Product not found by provided ID",
      })
    }     
    


  }catch(err){
    res.status(500).json({
      message: err.message,
      error: "There is a server side error"

    })

  }


}

exports.fetchOderById = async (req, res, next) => {
  try{

    const findResult = await Order.findById(req.params.orderId).populate('product','name price _id');
    if (findResult) {
      res.status(200).json({
        
          message: "Order was fetch sucessfully",
          order:{
            _id: findResult._id,
            quantity: findResult.quantity,
            product: findResult.product,
            request:{
              type:'GET',
              url: 'localhost:5000/orders/' + findResult._id
            }
    
        }
        

      })
    } else {
      res.status(200).json({
        status: 'Ok',
        message: "There is no Order found ",
      })
    }


  }catch(err){
    res.status(500).json({
      message: err.message,
      error: "There is a server side error"

    })

  }
}

exports.updateById = async(req, res, next) => {

  try{

    const findResult = await Order.findByIdAndUpdate(
      {_id: req.params.orderId},
      {
        $set: {
          quantity: req.body.quantity

        }
      },
      {
        new: true
      }
    ).populate('product','name price _id');
    if (findResult) {
      res.status(200).json({
        
          message: "Order Update sucessfully",
          order:{
            _id: findResult._id,
            quantity: findResult.quantity,
            product: findResult.product,
            request:{
              type:'GET',
              url: 'localhost:5000/orders/' + findResult._id
            }
    
        }
        

      })
    } else {
      res.status(200).json({
        status: 'Ok',
        message: "There is no Order found ",
      })
    }    

  }catch(err){
    res.status(500).json({
      message: err.message,
      error: "There is a server side error"

    })

  }

}

exports.delete = async(req, res, next) => {


  try{

    const findResult = await Order.findByIdAndDelete(req.params.orderId);
    if (findResult) {
      res.status(200).json({
        
          message: "Order was delete sucessfully",
         })
    } else {
      res.status(200).json({
        status: 'Ok',
        message: "There is no Order found ",
      })
    }


  }catch(err){
    res.status(500).json({
      message: err.message,
      error: "There is a server side error"

    })

  }
  



}