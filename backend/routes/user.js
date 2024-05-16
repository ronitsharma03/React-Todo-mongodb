const dotenv = require("dotenv").config();
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const { User, Todo } = require("../db/db");
const { authMiddleware } = require("../middleware/middleware");
const zod = require("zod");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const JWT_SECRET = process.env.JWT_SECRET;



router.get('/me', async (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(411).json({
            message: "Authentication failed!"
        });
    }
    return res.json({
        message: "Authentication successfull!"
    });
});


// Signup route for the users

const signupBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6),
    firstname: zod.string().min(3),
    lastname: zod.string().min(3)
});

router.post("/signup", async (req, res) => {
    const { success } = signupBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Wrong Inputs"
        });
    }

    try {
        const existingUser = await User.findOne({
            username: req.body.username
        });

        if (existingUser) {
            return res.status(411).json({
                message: "Email already taken!"
            });
        } else {

            const hash = await bcrypt.hash(req.body.password, saltRounds);
            const newUser = await User.create({
                username: req.body.username,
                password: hash,
                firstname: req.body.firstname,
                lastname: req.body.lastname
            });
            // console.log(newUser)

            const userId = newUser._id;


            const token = jwt.sign({
                userId
            }, JWT_SECRET);

            return res.status(200).json({
                message: "Signup successfull",
                token: token
            });
        }
    } catch (error) {
        console.log(`Error signing up the user ${error}`);
        return res.status(411).json({
            message: "Something went wrong!"
        });
    }
});

// Signin route for the user
const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string().min(6)
});

router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body);
    if (!success) {
        return res.status(411).json({
            message: "Inputs are wrong!"
        });
    }
    else {
        try {
            const loggedUser = await User.findOne({
                username: req.body.username,
            });
            
            if(!loggedUser){
                return res.status(411).json({
                    message: "User not found!"
                });
            }

            const isPassword = await bcrypt.compare(req.body.password, loggedUser.password);
            if(!isPassword){
                return res.status(411).json({
                    message: "Error while logging in: Incorrect password"
                });
            }

            
            const token = jwt.sign({
               userId: loggedUser._id 
            }, JWT_SECRET);

            res.status(200).json({
                message: "User Authenticated!",
                token: token,
                firstname: loggedUser.firstname
            });
        }catch(e){
            console.log(e);
            return res.status(411).json({
                message: "Signin route catch - Something went wrong!"
            })
        }
        
    }
});


module.exports = router;