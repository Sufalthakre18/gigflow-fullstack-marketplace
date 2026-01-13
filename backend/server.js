
import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import connectDb from './config/db.js'

connectDb();

const app = express();

app.use(express.json());


app.get('/',(_,res)=>{
    res.send("API is running")
})

app.listen(process.env.PORT,()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})
