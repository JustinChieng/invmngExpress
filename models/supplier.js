const mongoose =  require("mongoose");
const { Schema, model} = mongoose;

//setup the schema
const supplierSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true
    }
});

//conver the schema into a model
const Supplier = model("Supplier",supplierSchema);
module.exports = Supplier;