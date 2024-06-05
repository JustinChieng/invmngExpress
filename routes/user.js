const express = require("express");
const router = express.Router();

const {
  loginUser,
  signUpUser,
  getUsers,
  getUser,
  deleteUser,
} = require("../controllers/user");

// login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // log in the user via loginUser()
    const user = await loginUser(email, password);
    // send back the logged-in user data
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// signup route
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    // create user via signUpUser()
    const user = await signUpUser(name, email, password);
    // send back the newly created user data
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// get all users excluding admins
router.get("/", async (req, res) => {
  try {
    const { perPage, page } = req.query;
    const users = await getUsers(perPage, page);
    res.status(200).send(users);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});


// get one user by ID
router.get("/:id", async (req, res) => {
  try {
    const user = await getUser(req.params.id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: "User not found!" });
    }
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

// delete user
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUser(id);
    res.status(200).send({ message: `User #${id} has been deleted.` });
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});

module.exports = router;
