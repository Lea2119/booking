// Controllers (or handlers) are responsible for handling the logic of a specific route.
// They receive the request, process it, interact with the database
// perform business logic operations, and generate an appropriate response.

import User from "../models/User.js";
import bcrypt from "bcrypt";

// ------ UPDATE USER INFORMATIONS ------- //

export const updateUser = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: { ...req.body, password: hash } }, // The $set operator replaces the value of a field with the specified value.
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
};

//  the { ...req.body, password: hash } object includes all the properties from req.body and sets the password field to the hashed password.
//  this way, the updated password will be saved in the database along with other user information.

// DELETE

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("user has been deleted");
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET

export const getUser = async (req, res) => {
  // Logic to fecth all hotels from the database
  try {
    // Send the response back to the client
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};

// GET ALL

export const getAllUser = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};
