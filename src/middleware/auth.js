import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';

export const userAuth = async (req, res, next) => {
    try {
        console.log("inside user auth")
        const cookie = req.cookies;
        const { token } = cookie;

        const isTokenValid = jwt.verify(token, process.env.JWT_SECRET);
        if (!isTokenValid) throw new Error("Token is expired!");

        const { _id } = isTokenValid;
        const loggedInUser = await User.findById(_id);


        if (!loggedInUser) throw new Error("User does not exists!");

        req.user = loggedInUser; 

        next();

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })
    }
}

export const isStudent = async (req, res, next) => {
    try {
        if(req.user.role !== "Student"){
            throw new Error("This is a protected route for students only!");
        }

        next();
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}

export const isAdmin = async (req, res, next) => {
    try {
        if(req.user.role !== "Admin"){
            throw new Error("This is a protected route for Admin only!");
        }

        next();
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}