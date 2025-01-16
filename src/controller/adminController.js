import { User } from "../models/user.model.js";
import { Assignment } from "../models/assignment.model.js";

export const getAllAdmins = async (req, res) => {
    try {
        const allAdmins = await User.find({
            role: "Admin",
        });

        return res.status(200).json({
            message: "Admins fetched successfully",
            admins: allAdmins,
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
}

export const getAllPendingRequests = async (req, res) => {
    try {
        const user = req.user;

        // get all the pending assignment requests of current admin
        const pendingRequests = await Assignment.find({
            toUserId: user._id,
            status: "Pending",
        })
        .populate("fromUserId", ["firstName", "lastName", "email"]);

        return res.status(200).json({
            message: "Pending requests fetched successfully!",
            requests: pendingRequests,
        });

    } catch (error) {
        return res.status(400).json({
            message: error.message,
        })
    }
}


export const acceptAssignment = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}


export const rejectAssignment = async (req, res) => {
    try {
        
    } catch (error) {
        
    }
}