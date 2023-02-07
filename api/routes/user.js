const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const userSchema = require('../models/user');
//model Create
const User = new mongoose.model('User', userSchema);   //'USER' collection name whis is convert to small leter with 's like users


//signup

router.post('/signup', async (req, res) => {
  try {
    const hashPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashPassword,
      status: req.body.status,
    });
    await newUser.save();
    res.status(200).json({
      'code': 200,
      'status': 'Ok',
      'messages': 'Signup was sucessfull',

    });
  } catch (err) {
    res.status(500).json({
      error: "Signup failed",
    })
  }


});


//login and JWT token create
router.post('/login', async (req, res) => {
  try {
    const user = await User.find({ username: req.body.username });
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
      if (isValidPassword) {
        //genarate JWT
        const token = jwt.sign({
          username: user[0].username,
          userId: user[0]._id
        },process.env.JWT_SECRET, {
          expiresIn:'1h'
        });
        res.status(200).json({
          'acess_token':token,
          'message':"Login Successfully"
        })

      } else {
        res.status(401).json({
          error: "Authentication Failed",
        })
      }

    } else {
      res.status(401).json({
        error: "Authentication Failed",
      })
    }



  } catch (err) {
    res.status(401).json({
      error: "Authentication Failed",
    })

  }


});



module.exports = router;