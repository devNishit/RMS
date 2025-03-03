import User from '../models/user.js';

// Customer register
export const registerCust = async (req,res,next)=>{
  
    const {email, password, name, mobile, address} = req.body;

    // exists user
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const newUser = new User({email,name, mobile, address, password});
    await newUser.save();
    res.json('New user register');  
  
    // auto login after register
    // req.login(finalUser,(e)=>{
    //     if(e){
    //       return  next(e);
    //     }
    // res.send("login success");
    // })
    };

// Edit Customer

    export const editCust = async (req,res)=>{
        const {name, mobile, address} = req.body;
        let id = req.params.id;
        await User.findByIdAndUpdate(id,{name, mobile, address});
        res.json("user edited");
      };