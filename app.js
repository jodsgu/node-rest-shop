const express = require('express');
const morgan = require('morgan'); //for extra log
const app = express();
const dotenv = require('dotenv'); //env variable use
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');
const mongoose = require('mongoose');


/* app.use((req,res,next)=>{
  res.status(200).json({
    message:'It works!'
  });
}); */

app.use(morgan('dev'));
app.use(express.json()); //get data from payload
dotenv.config();

//database connect with mongoose
mongoose.connect('mongodb://localhost:27017/node-shop',{
  useNewUrlParser:true,
  useUnifiedTopology:true,
})
.then(()=>console.log("connection sucessfull"))
.catch((err)=>console.log(err));



//code for if erro occur in check login
const  errorHandler = (err, req, res, next)=>{
  if(res.headerSent){
    return next(err);
  }
  res.status(500).json({error:err})
}
//End check login


//CORS error handle
app.use((req,res,next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"

  );
  if(req.method ==='OPTIONS'){
    res.header('Access-Control-Allow-Methods','GET, POST, PUT, DELETE,PATCH');
    return res.status(200).json({})
   
  }
  next();
})
//End CORS error handle


app.use('/products',productRoutes);
app.use('/orders',orderRoutes);
app.use('/user',userRoutes);
app.use(errorHandler);


//code for url not found err occur
//ERROR handling Option1
app.use((req,res,next)=>{
  //custom error define
  const error = new Error('Page not found');
  error.status = 404;   
  next(error);
});

app.use((err,req,res,next)=>{
  
   res.status(err.status || 500);
    res.json({
      error:{
        message:err.message
      }
    })
    
  

});
//End for url not found err occur

/* ERROR handling Option2

app.use((req,res,next)=>{
   //res.status(404).send('Requested url was not found');  //if throw erro from here
   next('Requested url was not found'); //if send error to next error handeler 

});


//error handling [error throw from internal]
app.use((err,req,res,next)=>{
  if(err.message){
    res.status(500);
    res.json({
      error:{
        message:err.message
      }
    })
  }else{
    res.status(404);
    res.json({
      error:{
        message:'There was an error!'
      }
    })
  }

}); */
//server listing
app.listen(4000,()=>{
  
  console.log('listing port 4000')
})
//module.exports = app;