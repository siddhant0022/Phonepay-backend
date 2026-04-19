const express = require('express');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res) => {
  try{
   const {name, email, password, mpin} = req.body;

   if(!name || !email || !password || !mpin){
    return res.status(400).json({message: "Please fill all the fields"});
   }

   const existingUser = await User.findOne({email});

   if(existingUser){
    return res.status(400).json({message: "User already exists"});
   }
   const hashedPassword = await bcrypt.hash(password, 10);
 
  const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '1h'});
   res.cookie("token", token);

   const newUser = new User({
    name,
    email,
    password: hashedPassword,
    mpin
   });
   await newUser.save();

   res.status(200).json({message: "User Registered Successfully",
    user: {
      name: newUser.name,
      email: newUser.email,
      balance: newUser.balance,
      mpin: newUser.mpin}
    }

   );

   
  }catch(err){
   res.status(500).json({message: "Error in registering the user", error: err.message});
  }
} 

const LoginUser = async (req, res) => {
  try{
    const {email, password} = req.body;
    if(!email || !password){
    return res.status(400).json({
      message: "Please fill all the fields"
    })
    }
     const existingUser = await User.findOne({email});
     if(!existingUser){
      return res.status(400).json({
        message: "User does not exist"
      })
     }

     const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
     if(!isPasswordCorrect){
      return res.status(400).json({
        message: "Invalid Credentials"
      })
     }

     const token = jwt.sign({email}, process.env.JWT_SECRET, {expiresIn: '1h'});
     res.cookie("token", token);

     res.status(200).json({
      message: "User Logged in successfully",
      user:{
        name: existingUser.name,
        email: existingUser.email,
        balance: existingUser.balance,
        mpin: existingUser.mpin
      }
      
     })

  }catch(err){
    res.status(500).json({
      message: "Error in Login the user",
      error: err.message
    })
  }
}

const LogoutUser = async (req, res) => {
  try{
    res.clearCokkie("token");
    res.status(200).json({
      message: "User Logged out successfully"
    })
  } catch(err){

  }
}

module.exports = {registerUser, LoginUser};