const Product = require("../models/product");
const Supplier = require("../models/supplier");

const getProductCategories = async () => {
  let categories = [];
  const products = await Product.find();
  products.forEach((product) => {
    if (!categories.includes(product.category)) {
      categories.push(product.category);
    }
  });

  return categories;
};

const getSupplierCategories = async () => {
    let categories = [];
    const suppliers = await Supplier.find();
    suppliers.forEach((supplier) => {
      if (!categories.includes(supplier.category)) {
        categories.push(supplier.category);
      }
    });
  
    return categories;
  };

module.exports = {
  getProductCategories,
  getSupplierCategories
};
