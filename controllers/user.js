const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { JWT_PRIVATE_KEY } = require("../config");

const User = require("../models/user");

const generateTokenForUser = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    JWT_PRIVATE_KEY
  );
  {
    expiresIn: "3600";
  }
};

// get all users excluding admins
const getUsers = async (perPage = 5, page = 1) => {
  try {
    const users = await User.find({ role: "user" }) // Filter out users with role 'admin'
      .limit(perPage)
      .skip((page - 1) * perPage)
      .sort({ _id: -1 });
    return users;
  } catch (error) {
    throw new Error(error);
  }
};

// get one user by ID
const getUser = async (id) => {
  const user = await User.findById(id);
  if (!user) throw new Error("User not found");
  return user;
};

const getUserByEmail = async (email) => {
  // find one user with provided email
  const user = await User.findOne({ email: email });
  return user;
};

// login user
const loginUser = async (email, password) => {
  // 1. check if user exists
  const user = await getUserByEmail(email);

  // 2. if user doesn't exist, return error
  if (!user) throw new Error("Invalid email or password");

  // 3. check if password matches or not
  const isPasswordMatch = bcrypt.compareSync(password, user.password);
  if (!isPasswordMatch) {
    throw new Error("Invalid email or password");
  }

  //4 generate the token
  const token = generateTokenForUser(user);

  //5return back the user data
  return {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: token,
  };
};

// create user
const signUpUser = async (name, email, password) => {
  // 1. check if email already exists
  const emailExist = await getUserByEmail(email);
  if (emailExist) throw new Error("Email already exists");

  // 2. create the new user
  const newUser = new User({
    name: name,
    email: email,
    password: bcrypt.hashSync(password, 10), // hash the password
  });

  // 3. save the data
  await newUser.save();

  //4 generate the token
  const token = generateTokenForUser(newUser);

  //5return back the user data
  return {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
    token: token,
  };
};

// delete user
const deleteUser = async (id) => {
  // find user by ID and delete
  return await User.findByIdAndDelete(id);
};

module.exports = {
  getUsers,
  getUser,
  getUserByEmail,
  loginUser,
  signUpUser,
  deleteUser, // export deleteUser
};
