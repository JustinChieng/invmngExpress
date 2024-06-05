const Todo = require("../models/todo");

// Get all todos
const getTodos = async (perPage = 5, page = 1) => {
    try {
        const todos = await Todo.find({})
            .limit(perPage)
            .skip((page - 1) * perPage)
            .sort({ _id: -1 });
        return todos;
    } catch (error) {
        throw new Error(error);
    }
};

// Get a single todo by ID
const getTodo = async (id) => {
    const todo = await Todo.findById(id);
    return todo;
};

// Add a new todo
const addTodo = async (name) => {
    const newTodo = new Todo({
        name,
    });
    await newTodo.save();
    return newTodo;
};

// Update a todo by ID
const updateTodo = async (todo_id, name) => {
    const updatedTodo = await Todo.findByIdAndUpdate(
        todo_id,
        {
            name,
        },
        { new: true }
    );
    return updatedTodo;
};

// Delete a todo by ID
const deleteTodo = async (id) => {
    return await Todo.findByIdAndDelete(id);
};

module.exports = {
    getTodos,
    getTodo,
    addTodo,
    updateTodo,
    deleteTodo
};
