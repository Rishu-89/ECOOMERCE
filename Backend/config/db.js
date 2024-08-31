import mongoose from 'mongoose'
import colors from 'colors'
const connectDb=async()=>{
  
  try {
    const conn=await mongoose.connect(process.env.MONGO_URL);
  console.log(`connected to mongoDb database ${conn.connection.host}`.bgRed)
  } catch (error) {
    console.log(`error in database ${error}`)
  }
};
export default connectDb;