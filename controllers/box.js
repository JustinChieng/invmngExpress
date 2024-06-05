const Product = require("../models/product");

const getBoxes = async () => {
  let boxes = [];
  const products = await Product.find();
  products.forEach((product) => {
    if (!boxes.includes(product.box)) {
      boxes.push(product.box);
    }
  });

  return boxes;
};

module.exports = {
  getBoxes,
};
