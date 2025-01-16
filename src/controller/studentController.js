import { Assignment } from "../models/assignment.model.js"
import { User } from "../models/user.model.js";
import { uploadFileToCloudinary } from "../utils/cloudinary.js";
import fs from 'fs';

export const sendAssignment = async (req, res) => {
    try {
        const localFilePath = req.file.path;
        const fromUserId = req.user._id;
        const toUserId = req.params.toUserId;

        // check if user exists with such id
        const userExists = await User.findById(toUserId);
        if(!userExists) throw new Error("No user exists with such id");

        // check if user is an Admin
        if(userExists.role !== "Admin") throw new Error("User is not admin!");

        // check if user has already send assignment to admin
        const existingAssignmentRequest = await Assignment.findOne({
            fromUserId: fromUserId
        });

        if(existingAssignmentRequest) throw new Error("Already sent Assignment!");

        const response = await uploadFileToCloudinary(localFilePath);
        // once uploaded to cloudinary, delete local file from server
        fs.unlinkSync(localFilePath);

        const newAssignment = await Assignment.create({
            fromUserId,
            toUserId,
            assignmentUrl: response.url,
            assignmentPublicId: response.public_id,
            status: "Pending",
        });

        return res.status(200).json({
            success: true,
            message: "Assignment sent successfully! ",
            data: newAssignment,
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })
    }
}