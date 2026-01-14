import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import authRoutes from './routes/auth.route.js'

dotenv.config()
connectDb();

const app = express();

app.use(express.json());
app.use(cookieParser());


app.get('/',(_,res)=>{res.send("API is running")})
app.use('/api/auth',authRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})
