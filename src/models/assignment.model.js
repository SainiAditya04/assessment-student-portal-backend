import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        required: true,
    }
});

export const Assignment = mongoose.model("Assignment", assignmentSchema);