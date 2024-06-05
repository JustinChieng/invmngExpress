const express = require("express");
const router = express.Router();

const { getBoxes } = require("../controllers/box");

router.get("/", async (req, res) => {
  try {
    const boxes = await getBoxes();
    res.status(200).send(boxes);
  } catch (error) {
    res.status(400).send({
      message: error.message,
    });
  }
});

module.exports = router;