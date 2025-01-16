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
    assignmentUrl: {
        type: String,
        required: true,
    },
    assignmentPublicId: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ["Pending", "Accepted", "Rejected"],
        required: true,
    }
});


// what if a student is trying to send assignment to itself ?
assignmentSchema.pre("save", function(next) {
    if(this.fromUserId.equals(this.toUserId)){
        throw new Error("Cannot send request to a Student!");
    }

    next();
});

export const Assignment = mongoose.model("Assignment", assignmentSchema);