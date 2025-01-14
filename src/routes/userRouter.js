import express from 'express';
import { login, register } from '../controller/authControl.js';

const userRouter = express.Router();

// user registration and login
userRouter.route('/signup').post(register);
userRouter.route('/login').post(login);

// student's route


// Admin's route

export default userRouter;