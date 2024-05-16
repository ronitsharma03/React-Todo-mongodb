const express = require("express");
const router = express.router();
const userRouter = require("./user");
const todoRouter = require("./todos");


router.use("/user", userRouter);
router.use("/todos", todoRouter);

module.exports = router;