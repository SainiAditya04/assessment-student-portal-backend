import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["Student", "Admin"],
        required: true,
    }
});

// hash the password before saving in database
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// the following methods are only accessible on an instance of User model,
//  not on model itself.

userSchema.methods.getJwt = function () {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: "8d" }
    );
    return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, this.password);
    return isPasswordValid;
};

export const User = mongoose.model("User", userSchema);
