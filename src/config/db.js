const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();


const connectDB  = async () => {
  try{
     await mongoose.connect(process.env.MONGO_URI)
    console.log("Connect to database successfully");
  }catch(err){
    console.log("Error in connecting to database", err);
  }
}
module.exports = connectDB;