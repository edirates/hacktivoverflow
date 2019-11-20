const bcrypt = require("../helpers/bcrypt.js");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const model = mongoose.model;

const userSchema = new Schema ({
    email: {
        type: String,
        required: [true, `Email is required`],
        match: [/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, `Invalid email format`],
        validate: {
            validator: function (v) {
                return User.findOne({
                    email: v
                })
                .then((found) => {
                    if (found)  return false;
                    else    return true;
                });
            },
            message: `Email must be unique`
        }
    },
    password: {
        type: String,
        required: [true, `Password is required`],
        minlength: [8, `Password length at least 8 characters`]
    },
    name: {
        type: String,
        required: [true, `Name is required`]
    },
    watched_tags: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

userSchema.pre("save", function (next) {
    this.password = bcrypt.hash(this.password);
    next();
});

const User = model("User", userSchema);

module.exports = User;