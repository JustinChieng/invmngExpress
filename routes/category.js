const express = require("express");
const router = express.Router();

const { getProductCategories, getSupplierCategories } = require("../controllers/category");

// Route for getting product categories
router.get("/product-categories", async (req, res) => {
  try {
    const categories = await getProductCategories();
    res.status(200).send(categories);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

// Route for getting supplier categories
router.get("/supplier-categories", async (req, res) => {
  try {
    const categories = await getSupplierCategories();
    res.status(200).send(categories);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;
