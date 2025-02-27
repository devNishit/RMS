import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import User from './models/user.js';
import userRouter from './routes/userRouter.js';
import customerRouter from './routes/customerRouter.js';
import passResetRouter from './routes/passResetRouter.js';

import { globalErrorHandler } from './utils/globalErrorHandler.js';
import expressError from './utils/expressError.js';

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// Database connection
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

main().catch(err => console.log(err));


// Basic Routes
app.get('/', (req, res) => {
  res.send('Welcome to the MERN Stack Application');

});

// user
app.use('/user',userRouter);
app.use('/user/customer',customerRouter);

//Reset Passoword
app.use('/user/password',passResetRouter);


// Error Handling Middleware
app.use(globalErrorHandler);

// Server setup
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
