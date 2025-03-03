import User from '../models/user.js';
import genToken from '../utils/generateToken.js';
import bcrypt from 'bcryptjs';

// register new user
export const registerUser = async(req,res,next)=>{
  
    let {email, password, name, role, mobile, address, joiningDate, salary, shiftTimings} = req.body;
    
    // exists user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    let newUser = new User({email, name, password, role, mobile, address, joiningDate, salary, shiftTimings});
    await newUser.save();
    res.json('New user register');  
  };

// gentate login token
  export const login = async(req,res,next)=>{
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = genToken(user);
    res.status(200).json({
      message: 'Login successful',
      token, // Send the token to the client
    });
  };

// render user edit form
  export const editform = async(req,res)=>{
    let id = req.params.id;
    let data = await User.findById(id);
    res.json(data);
  }

// update user
  export const updateUser = async (req,res)=>{
      // let { name, role, mobile, address, joiningDate, salary, shiftTimings} = req.body;
      let id = req.params.id;
      let user = await User.findByIdAndUpdate(id,req.body);
      res.json(user);
    };

// delete user
    export const deleteUser = async (req,res)=>{
      console.log("userBhai", req.body)
      let {id} = req.body;
      let deletedUser = await User.findByIdAndDelete(id);
      res.json("user deleted");
    };

// featch user
    export const userList = async(req,res)=>{
      let list = await User.find();
      res.json({'data':list})
    }