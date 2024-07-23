const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        index: true,
        required: [true, "Email required"],
    },
    password: {
        type: String,
        required: [true, "password required"],
    },
    token: {
        type: String,
    },
    name: {
        type: String,
        required: [true, "name required"],
    },
    orders: [
        {
            type: mongoose.Types.ObjectId
        }
    ],
    location: {
        type: String,
    }

});

const User = mongoose.model("user", UserSchema);

module.exports = User;