const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const uri = process.env.MONGODB_URI;
async function connectDb(){
    try{
        await mongoose.connect();
    }catch(e){
        console.log(`Error connecting to the db: ${e}`);
        process.exit(1);
    }
}

connectDb(process.env.MONGODB_URI);


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
        minLength: 8,
        trim: true
    },
    firstName: {
        type: String,
        required: true,
        trim: true,
        minLength: 3,
        maxLength: 30
    },
    lastName: {
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
    }
});

const Todo = mongoose.model("Todo", todoSchema);


module.exports = {
    User,
    Todo
};