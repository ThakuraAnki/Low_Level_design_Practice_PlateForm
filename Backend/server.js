const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;
const connectDB = require("./config/db");
const Problem = require("./models/problemModel");

const seedProblems = async () => {
    const problemCount = await Problem.countDocuments();

    if (problemCount === 0) {
        await Problem.insertMany([
            {
                title: "Design a Parking Lot",
                description: "Design a parking lot that supports multiple vehicle types, parking spots, and fee calculation.",
                difficulty: "Medium",
                requirements: [
                    "Support cars, motorcycles, and trucks",
                    "Assign vehicles to compatible parking spots",
                    "Calculate parking fees when a vehicle exits"
                ],
                expectedConcepts: [
                    "Encapsulation",
                    "Strategy Pattern",
                    "Interfaces"
                ]
            },
            {
                title: "Design a Library Management System",
                description: "Design a library system for managing books, members, borrowing, and returns.",
                difficulty: "Easy",
                requirements: [
                    "Add and remove books",
                    "Allow members to borrow and return books",
                    "Track unavailable books"
                ],
                expectedConcepts: [
                    "Entity Modeling",
                    "Encapsulation",
                    "State Management"
                ]
            }
        ]);
        console.log("Starter problems created");
    }
};

connectDB().then(seedProblems).catch((error) => {
    console.error("Failed to seed starter problems:", error);
});
app.use(cors());
app.use(express.json());
const problemRouter = require("./routes/problemRoutes");
const attemptRouter = require("./routes/attemptRoutes");
const submissionRouter = require("./routes/submissionRoutes");
const evaluationRouter = require("./routes/evaluationRoutes");

app.use("/api/evaluations", evaluationRouter);
app.use("/api/submissions", submissionRouter);
app.use("/api/attempts", attemptRouter);
app.use("/api/problems", problemRouter);
app.get("/", (req, res) => {
    res.json({
        message: "LLD Practice Platform API is running "
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});