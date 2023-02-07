const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const productSchema = require('../models/products');
//model create
const Product = new mongoose.model('Product', productSchema);


//get list of Product
router.get('/', async (req, res, next) => {
  try {
    const hostName = `${process.env.HOSTNAME}${req.baseUrl}`;
    const product = await Product.find()
      .select('name price _id');
     // console.log(product);
    if (product.length > 0) {
      res.status(200).json({
        count: product.length,
        products: product.map(Newproduct => {
          return {
            name: Newproduct.name,
            price: Newproduct.price,
            _id: Newproduct._id,
            request: {
              type: 'GET',
              url:`${hostName}/${Newproduct._id}` 
              //url: 'localhost:5000/products/' + Newproduct._id
            }
          }
        })
      })
    } else {
      res.status(200).json({
        status: 'Ok',
        message: "There is no Product ",


      })
    }


  } catch (err) {
    res.status(500).json({
      message: err.message,
      error: "There is a server side error"

    })

  }


});

//create product 
router.post('/', async (req, res, next) => {
  try {
    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      price: req.body.price

    });
    const saveProduct = await product.save();
    res.status(201).json({
      message: "Created product sucessfully",
      createdProduct:{
        name: saveProduct.name,
        price: saveProduct.price,
        _id: saveProduct._id,
        request:{
          type:'GET',
          url: 'localhost:5000/products/' + saveProduct._id
        }

    }
    })

  } catch (err) {
    //console.log(err.message),
    res.status(500).json({
      message: err.message,
      error: "There is a server side error"

    })

  }

})

//fetch product by ID     Method 1  
router.get('/:productId', async (req, res, next) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById(id);

    if (product) {
      res.status(200).json({
        
        message: "Product was fetch sucessfully",
        product:{
          name: product.name,
          price: product.price,
          _id: product._id,
          request:{
            type:'GET',
            url: 'localhost:5000/products/' + id
          }
  
      }
        

      })
    } else {
      res.status(200).json({
        status: 'Ok',
        message: "There is no Product ",


      })
    }
  } catch (err) {
    //console.log(err.message),
    res.status(500).json({
      message: err.message,
      error: "There is a server side error"

    })

  }
})

/* //fetch product by ID  Method 2  
router.get('/:productId',(req,res,next)=>{
  const id = req.params.productId;
  Product.findById(id)
  .exec()
  .then(doc =>{
    console.log(doc);
    if(doc){
      res.status(200).json(doc)
    }else{
      res.status(404).json({
        message:'No valid data found from provided ID' 
      })
    }
  })
  .catch(err =>{
    console.log(err);
    res.status(500).json({
      error:err
    })
  });
  
}) */







//Update products by product ID
router.patch('/:productId', async (req, res, next) => {
  try {
    //const id = req.params.productId;
    const result = await Product.findByIdAndUpdate(
      { _id: req.params.productId },
      {
        $set: {
          name: req.body.name,
          price: req.body.price

        }
      },
      {
        new: true
      }
    );
    res.status(200).json({
      
      message: "Product was Update sucessfully",
      product:{
        name: result.name,
        price: result.price,
        _id: result._id,
        request:{
          type:'GET',
          url: 'localhost:5000/products/' + result._id
        }

    }

    })

  } catch (err) {

    res.status(500).json({
      message: err.message,
      error: "There is a server side error"

    })
  }




})

//Delete products by ID
router.delete('/:productId', async (req, res, next) => {
  try {
    const id = req.params.productId;
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      status: 'Ok',
      message: "Product was Delete sucessfully"


    })

  } catch (err) {
    //console.log(err.message),
    res.status(500).json({
      message: err.message,
      error: "There is a server side error"

    })

  }

})


module.exports = router;
