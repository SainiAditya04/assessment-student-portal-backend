import express from 'express';
import { login, register } from '../controller/authControl.js';
import upload from '../middleware/multer.js';
import { sendAssignment } from '../controller/studentController.js';
import { isStudent, userAuth } from '../middleware/auth.js';

const userRouter = express.Router();

// user registration and login
userRouter.route('/signup').post(register);
userRouter.route('/login').post(login);

// student's route
userRouter
.route('/send-assignment/:toUserId')
.post(userAuth, isStudent, upload.single("assignment"), sendAssignment);
// use upload.array() if sending multiple assignments,

// Admin's route

export default userRouter;