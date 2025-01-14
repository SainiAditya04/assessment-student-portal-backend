import { User } from '../models/user.model.js';

export const register = async (req, res) => {
    try {
        const { 
            firstName, 
            lastName,
            email,
            password, 
            role, 
        } = req.body;

        if(!firstName || !lastName || !email || !password || !role){
            throw new Error("All fields are required");
        }

        // check if user already exists
        const alreadyExist = await User.findOne({ email });
        if(alreadyExist){
            throw new Error("Already exists!");
        }

        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password,
            role,
        });

        return res.status(200).json({
            message: "User created successfully!",
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}

export const login = async (req, res) => {
    try {
        const { 
            email,
            password
        } = req.body;

        const userExists = await User.findOne({ email });
        if(!userExists) throw new Error("User does not exists!");

        const isPasswordValid = await userExists.validatePassword(password);
        if(!isPasswordValid) throw new Error("password invalid!");

        const token = userExists.getJwt();
        res.cookie("token", token);

        return res.status(200).json({
            message: "User login successfull!",
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })
    }
}

