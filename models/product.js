const mongoose = require("mongoose");
const { Schema, model } = mongoose;

//setup the schema
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String
    },
    quantity: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    box: {
        type: Number,
        required: true,
    }
});

//convert the schema into a model
const Product = model ("Product",productSchema);
module.exports = Product; 