import dotenv from 'dotenv';
dotenv.config();
import User from '../models/user.js';
import jwt from 'jsonwebtoken';
import expressError from '../utils/expressError.js';
import { transporter } from '../config/nodeMailerConf.js';


// Forgot Password
export const forgotPass = async(req,res,next)=>{
    let user =  await User.findByUsername(req.body.email);
    if(!user){
      console.log("not");
      return next(new expressError(400, "Invaild Email"));
      
    }

    // gernarte resetToken
    let resetToken = jwt.sign({id:user._id},process.env.JWTSECRET,{expiresIn:'15m'})
  
    async function main() {
      const info = await transporter.sendMail({
        from:process.env.GMAIL,
        to:user.username,
        subject:"Reset Password",
        html:`<h1>Reset Password</h1>
              <p>You can reset password </p>
              <br/><br/>
        <a href="http://localhost:5050/user/password/reset/${resetToken}" 
     style=" margin: 10px 20px; padding: 10px 20px; background-color: red; color: white; text-decoration: none; border-radius: 5px;">
     Reset Password
  </a> <br/><br/>
        <b>its expired in 15 min</b>`
      });
    }
  
    main().then(res.json("Email send successfully")).catch(console.error);
    
  };

// Reset Pass token
  export const resetToken = async(req,res)=>{
    const decode = jwt.verify(req.params.token,process.env.JWTSECRET);
    let user = await User.findById(decode.id);
    res.send(req.params.token);
  };

// Reset Pass
  export const resetPass = async(req,res)=>{
    const decode = jwt.verify(req.params.token,process.env.JWTSECRET);
    let user = await User.findById(decode.id);
    await user.setPassword(req.body.password);
    await user.save();
    res.json(`password succecfully reset`);
};