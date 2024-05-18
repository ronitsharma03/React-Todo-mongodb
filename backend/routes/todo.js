const express = require("express");
const router = express.Router();
const { Todo } = require("../db/db");

const { authMiddleware } = require("../middleware/middleware");
const zod = require("zod");

// Create Todo route
const todoBody = zod.object({
    title: zod.string(),
    description: zod.string(),
    marked: zod.boolean().optional(),
});
router.post("/create", authMiddleware, async (req, res) => {
    const { success } = todoBody.safeParse(req.body);
    const { title, description, marked, Date } = req.body;
    if(!success){
        return res.status(411).json({
            message: "Check Inputs Please"
        });
    }
    try{
        await Todo.create({
            userId: req.userId,
            title: title,
            description: description,
            marked: marked,
            Date: Date
        });
        
        return res.json({
            message: "Todo created successfully!"
        });
    }catch(e){
        console.log(`Error creating Todo ${e}`);
        return res.status(411).json({
            message: "Error creating Todo"
        });
    }
    


});

module.exports = router;