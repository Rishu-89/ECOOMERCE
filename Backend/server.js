import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan';
import connectDb from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import categoryRoutes from './routes/categoryRoutes.js';
import productRoutes from './routes/productRoutes.js';
import cors from 'cors'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


let app=express();


dotenv.config();

app.use(cors({
  origin: '*', 
}));

connectDb();


app.use(express.json());
app.use(morgan('dev'));

// app.use(express.static(path.join(__dirname,"./Frontend/dist/index.html")));
app.use(express.static(path.join(__dirname, 'Frontend', 'dist')));

app.use('/api/v1/auth',authRoutes);
app.use('/api/v1/category',categoryRoutes);
app.use("/api/v1/product", productRoutes);



app.use("*",(req,res)=>{
  res.sendFile(path.join(__dirname, 'Frontend', 'dist', 'index.html'));
})


const PORT=process.env.PORT||8080;

app.listen(PORT,()=>{
  console.log(`Port is running in ${process.env.DEV_MODE} mode  on ${PORT}`.bgWhite.blue)
})