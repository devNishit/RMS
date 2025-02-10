import User from '../models/user.js';

// Customer register
export const registerCust = async (req,res,next)=>{
  
    const {username, password, name, mobile, address} = req.body;
    const newUser = new User({username,name, mobile, address});
    const finalUser = await User.register(newUser,password);
  
    // auto login after register
    req.login(finalUser,(e)=>{
        if(e){
          return  next(e);
        }
    res.send("login success");
    })
    };

// Edit Customer

    export const editCust = async (req,res)=>{
        const {name, mobile, address} = req.body;
        let id = req.params.id;
        await User.findByIdAndUpdate(id,{name, mobile, address});
        res.json("user edited");
      };