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
    Date: zod.string().datetime().optional()
});
router.post("/create", authMiddleware, async (req, res) => {
    const { success } = todoBody.safeParse(req.body);
    const { title, description, date } = req.body;
    if (!success) {
        return res.status(411).json({
            message: "Check Inputs Please"
        });
    }
    try {
        await Todo.create({
            userId: req.userId,
            title: title,
            description: description,
            marked: false,
            Date: date
        });

        return res.json({
            message: "Todo created successfully!"
        });
    } catch (e) {
        console.log(`Error creating Todo ${e}`);
        return res.status(411).json({
            message: "Error creating Todo"
        });
    }



});

const todoUpdateBody = zod.object({
    title: zod.string().optional(),
    description: zod.string().optional(),
    marked: zod.boolean().optional(),
    Date: zod.date().optional()
});
router.put("/:id/update", authMiddleware, async (req, res) => {
    const { success, data, error } = todoUpdateBody.safeParse(req.body);
    const { id } = req.params;
    if (!success) {
        return res.status(411).json({
            message: "Wrong inputs, Try again!",
            error: error
        });
    }

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            data,
            {
                new: true,
                runValidators: true
            }
        );
        console.log(updatedTodo);
        if (!updatedTodo) {
            return res.status(404).json({
                message: "Error while updating todos"
            });
        }
        return res.json({
            message: "Updated successfully!",
            todos: updatedTodo
        });
    } catch (e) {
        console.log(`Error occurred ${e}`);
        return res.status(411).json({
            message: "Internal Server Error!"
        });
    }
});

// Route to mark the todo whether true or false
router.patch("/:id/toggle", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try {
        const todo = await Todo.findById(id);

        if (!todo) {
            return res.status(411).json({
                message: "Todo not found!"
            });
        }

        const markedTodo = await Todo.findByIdAndUpdate(
            id,
            { marked: !todo.marked },
            { new: true, runValidators: true }
        );
        console.log(markedTodo);
        if(!markedTodo){
            return res.status(411).json({
                message: "Error marking Todo"
            });
        }

        return res.json({
            message: "Marked todo successfully!"
        });
    }catch(error){
        return res.status(404).json({
            message: "Failed Marking Todo",
            error: error
        });
    }
});

router.delete("/:id/delete", authMiddleware, async (req, res) => {
    const { id } = req.params;
    try{
        const todo = await Todo.findById(id);
        if(!todo){
            return res.status(411).json({
                message: "No todo found"
            });
        }

        const delTodo = await Todo.findByIdAndDelete(id);
        console.log(delTodo);
        return res.json({
            message: "Todo deleted successfully!",
            id: delTodo.id
        })
    }catch(error){
        console.log(`Error deleting Todo!`);
        return res.status(411).json({
            message: "Error deleting the Todo"
        })
    }
});

router.get("/mytodos", authMiddleware, async (req, res) => {
    try{
        const userTodos = await Todo.find({
            userId: req.userId
        });

        if(!userTodos){
            return res.json({
                message: "Todo list is empty"
            });
        }

        console.log(userTodos);
        return res.json({
            todos: userTodos,
            message: "Todo found!"
        });
    }catch(e){
        console.log("Unexpected Error occurred");
        return res.status(404).json({
            message: "Unexpected error happened"
        });
    }
});
module.exports = router;