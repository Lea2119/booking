import User from "../models/User.js";
import bcrypt from "bcrypt"; // // bcrypt library is used for password hashing and comparison. It provides functions to generate a salt and hash passwords securely.
import jwt from "jsonwebtoken";

// ----- CREATE NEW USER ----- //

export const register = async (req, res, next) => {
  // asynchronous function that takes three parameters: req, res, and next.
  // These parameters represent the request, response, and next middleware function.

  try {
    const salt = bcrypt.genSaltSync(10);
    // This line generates a salt using the bcrypt.genSaltSync() function.
    // The number 10 represents the cost factor, determining the computational complexity of the hashing process.
    // Higher values increase the time it takes to hash the password but also make it more secure.
    const hash = bcrypt.hashSync(req.body.password, salt);
    // This line hashes the password from the request body (req.body.password) using the salt generated in the previous step.
    // The bcrypt.hashSync() function synchronously generates a hash based on the provided password and salt.

    // new instance of the User model is created using the new keyword: const newUser = new User({ ... });. 
    
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      country: req.body.country,
      city: req.body.city,
      phone: req.body.phone,
      img: req.body.img,
      password: hash,
    });

    // SAVE NEW USER INTO DATABASE 

    await newUser.save();
    res.status(200).send("User has been created");
  } catch(err) {
    next(err);
  }
};

// ----- LOGIN USER ----- //

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    // COMPARISON BETWEEN PASSWORD ENTERED AND CRYPTED PASSOWRD INTO DATABASE
    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username"));

      // CREATION OF A TOKEN 

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT
    );
    
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ ...otherDetails });
  } catch (err) {
    next(err);
  }
};
