const express = require("express");
const {
    addTodo,
    getTodos,
    getTodo,
    updateTodo,
    deleteTodo,
} = require("../controllers/todo");

// Set up todo router
const router = express.Router();

// Get all todos
router.get("/", async (req, res) => {
    try {
        res.status(200).send(await getTodos(req.query.perPage, req.query.page));
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Get a single todo by ID
router.get("/:id", async (req, res) => {
    try {
        const todo = await getTodo(req.params.id);
        if (todo) {
            res.status(200).send(todo);
        } else {
            res.status(404).send({ message: "Todo not found!" });
        }
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Create a new todo
router.post("/", async (req, res) => {
    try {
        const { name } = req.body;
        const newTodo = await addTodo(name);
        res.status(200).send(newTodo);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Update a todo by ID
router.put("/:id", async (req, res) => {
    try {
        const { name } = req.body;
        const updatedTodo = await updateTodo(req.params.id, name);
        res.status(200).send(updatedTodo);
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Delete a todo by ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await deleteTodo(id);
        res.status(200).send({ message: `Todo #${id} has been deleted.` });
    } catch (error) {
        res.status(400).send({ message: error.message });
    }
});

// Export the router
module.exports = router;
