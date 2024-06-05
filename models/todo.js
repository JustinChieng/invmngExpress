const mongoose = require("mongoose");
const { Schema, model } = mongoose;

// Setup the schema
const todoSchema = new Schema({
    name: {
        type: String,
        required: true,
    }
});

// Convert the schema into a model
const Todo = model("Todo", todoSchema);
module.exports = Todo;
