const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// create the express app
const app = express();

// middleware to handle JSON request
app.use(express.json());
// set the upload folder as static path
app.use("/uploads", express.static("uploads"));

// setup a cors policy
const corsHandler = cors({
    origin: "*",
    methods: "GET,PUT,POST,DELETE",
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: true,
    optionsSuccessStatus: 200,
  });


// apply the cors to middleware
app.use(corsHandler);

// connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/invmng")
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

//Routes
const userRoute = require("./routes/user");
const productsRoute = require("./routes/product");
const suppliersRoute = require("./routes/supplier");
const categoriesRoute = require("./routes/category");
const boxesRoute = require("./routes/box")
const todosRoute = require("./routes/todo")

app.use("/users", userRoute);
app.use("/products", productsRoute);
app.use("/suppliers", suppliersRoute);
app.use("/categories", categoriesRoute);
app.use("/boxes", boxesRoute);
app.use("/todos", todosRoute );


// start the server
app.listen(5000, () => {
    console.log("Server is running at http://localhost:5000");
  });
  
