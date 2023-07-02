import express from "express";
import { login, register } from "../controllers/auth.js";

const router = express.Router(); // This line creates a new router object by calling the express.Router() function and assigns it to the variable router.

// ROUTHE FOR REGISTER

// The Router object allows to define routes and their corresponding HTTP methods.
// When a request matching one of these routes is received, the corresponding function will be called to handle the request.

router.post("/register", register);
router.post("/login", login);

export default router;
