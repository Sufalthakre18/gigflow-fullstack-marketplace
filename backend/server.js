import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDb from './config/db.js'
import authRoutes from './routes/auth.route.js'
import gigRoutes from './routes/gig.routes.js'
import bidRoutes from './routes/bid.route.js'

dotenv.config()
connectDb();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173', 
    credentials: true,               
  })
);


app.get('/',(_,res)=>{res.send("API is running")})
app.use('/api/auth',authRoutes)
app.use('/api/gigs',gigRoutes)
app.use('/api/bids',bidRoutes)

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})
