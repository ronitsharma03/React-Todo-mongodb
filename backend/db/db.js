const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

try {
    mongoose.connect(process.env.MONGODB_URL)
        .then(() => {
            console.log("Connected to DB");
        })
}
catch (e) {
    console.log("Cannot connect to database Error: " + e);
}


// Mongoose Model for user and Todos
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        minLength: 3,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true
    },
    firstname: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 30
    },
    lastname: {
        type: String,
        required: false,
        trim: true,
        minLength: 3,
        maxLength: 30
    }
});

const User = mongoose.model('User', userSchema);

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true,
        required: false
    },
    marked: {
        type: Boolean,
        default: false
    },
    Date: {
        type: String,
        trim: true
    }

});

const Todo = mongoose.model("Todo", todoSchema);


module.exports = {
    User,
    Todo
}