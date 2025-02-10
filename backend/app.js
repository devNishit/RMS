import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import session from 'express-session';
import passport from 'passport';
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

// Database connection
async function main() {
  await mongoose.connect(process.env.MONGO_URI);
}

main().catch(err => console.log(err));

// Session
const sessionInfo = {
  secret:process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 3 * 24 * 60 * 60 * 1000, // 3 days in milliseconds
  }
}

app.use(session(sessionInfo));

// Passport
app.use(passport.initialize());
app.use(passport.session());

// Passport setup
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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
