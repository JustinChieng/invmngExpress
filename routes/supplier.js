const express = require("express");
const {
  addSupplier,
  getSuppliers,
  getSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplier");

// set up supplier router
const router = express.Router();

// get suppliers
router.get("/", async (req, res) => {
  try {
    res
      .status(200)
      .send(
        await getSuppliers(req.query.category, req.query.perPage, req.query.page)
      );
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// get one supplier
router.get("/:id", async (req, res) => {
  try {
    const supplier = await getSupplier(req.params.id);
    if (supplier) {
      res.status(200).send(supplier);
    } else {
      res.status(404).send({ message: "Supplier not found!" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Create
router.post("/", async (req, res) => {
  try {
    const { name, email, phone, category } = req.body;
    const newSupplier = await addSupplier(name, email, phone, category);
    res.status(200).send(newSupplier);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Update
router.put("/:id", async (req, res) => {
  try {
    const { name, email, phone, category} = req.body;
    const updatedSupplier = await updateSupplier(
      req.params.id,
      name,
      email,
      phone,
      category,
    );
    res.status(200).send(updatedSupplier);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSupplier(id);
    res.status(200).send({ message: `Supplier #${id} has been deleted.` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// export
module.exports = router;
