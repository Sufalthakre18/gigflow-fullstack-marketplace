import express from 'express'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import dotenv from 'dotenv'
import http from 'http';
import { Server } from 'socket.io';

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
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true,
  })
);


app.get('/', (_, res) => { res.send("API is running") })
app.use('/api/auth', authRoutes)
app.use('/api/gigs', gigRoutes)
app.use('/api/bids', bidRoutes)


// HTTP SERVER and Socket

const server = http.createServer(app)
export const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL  || 'http://localhost:5173',
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log('Socket connected:', socket.id);

  socket.on('join', (userId) => {
    socket.join(userId);
  });

  socket.on('disconnect', () => {
    console.log('Socket disconnected:', socket.id);
  });
});



const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});