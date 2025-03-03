import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
import expressError from '../utils/expressError.js';

dotenv.config();


export const verifyToken = (req, res, next) => {
    const token = req.header("Authorization");
//    token = token.split(" ").length === 2 ? tokenParts[1] : token
    console.log("ok",token);
    if (!token) return next(new expressError(401, "Access denied"))
   

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_TOKEN_SECRET);
        req.user = decoded;
      
        next();
    } catch (error) {
        next(new expressError(400, "Invalid token"));
    }
};


export const verifyRoles = (requiredRoles) => {
    return(
        (req,res,next) =>{
            if (!req.user || !req.user.role) {
                
                return next(new expressError(401, "Unauthorized"));

            }

            // Check if user's single role exists in the requiredRoles array
        if (!requiredRoles.includes(req.user.role)) {
            return next(new expressError(403, "Forbidden: Insufficient permissions"))
            
        }

        next(); // User has permission, proceed
        }
    )
    };

