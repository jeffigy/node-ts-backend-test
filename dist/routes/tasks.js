"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
let tasks = [];
const taskValidationRules = [
    (0, express_validator_1.body)("title").notEmpty().withMessage("Title is required"),
    (0, express_validator_1.body)("description").notEmpty().withMessage("Description is required"),
    (0, express_validator_1.body)("completed").isBoolean().withMessage("Completed must be a boolean"),
];
// Add your CRUD API implementation here
router.get("/", (req, res) => {
    res.json(tasks);
});
router.post("/", taskValidationRules, (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const task = {
        id: tasks.length + 1,
        title: req.body.title,
        description: req.body.description,
        completed: false,
    };
    tasks.push(task);
    res.status(201).json(task);
});
router.get("/:id", (req, res) => {
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).send("Task not found");
    }
    else {
        res.json(task);
    }
});
router.put("/:id", taskValidationRules, (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).send("Task not found");
    }
    else {
        task.title = req.body.title || task.title;
        task.description = req.body.description || task.description;
        task.completed = req.body.completed || task.completed;
        res.json(task);
    }
});
router.delete("/:id", (req, res) => {
    const index = tasks.findIndex((t) => t.id === parseInt(req.params.id));
    if (index === -1) {
        res.status(404).send("Task not found");
    }
    else {
        tasks.splice(index, 1);
        res.status(204).send();
    }
});
exports.default = router;
