const express = require("express");

const problemRouter = express.Router();

const {
    createProblem,
    getProblems
} = require("../controller/problemController");


problemRouter.post("/create", createProblem);

problemRouter.get("/", getProblems);


module.exports = problemRouter;