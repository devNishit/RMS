import User from '../models/user.js';

// register new user
export const registerUser = async(req,res,next)=>{
    let {username, password, name, role, mobile, address, joiningDate, salary, shiftTimings} = req.body;
    let newUser = new User({username, name, role, mobile, address, joiningDate, salary, shiftTimings});
    await User.register(newUser,password);
    res.json('New user register');  
  };

// login
  export const login = (req,res)=>{
    res.send("Login Successful");
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
      let {id} = req.body;
      let deletedUser = await User.findByIdAndDelete(id);
      res.json("user deleted");
    };