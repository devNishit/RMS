import jwt from 'jsonwebtoken';
import dotenv from "dotenv";

dotenv.config();

const generateToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_TOKEN_SECRET, { expiresIn: "15d" });
  };

export default generateToken;