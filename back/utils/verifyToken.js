import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authentificated"));
  }
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403, "Token is not valid!"));
    req.user = user;
    next();
  });
};

export const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, (err) => {
    if (err) return next(createError(403, "YOU ARE NOT AUTHORIZED!"));
    if (req.user.id == req.params.id || req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "YOU ARE NOT AUTHORIZED!")); // Use 'return' here
    }
  });
};

export const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, (err) => {
    if (err) return next(createError(403, "YOU ARE NOT AUTHORIZED!"));
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "YOU ARE NOT AUTHORIZED!")); // Use 'return' here
    }
  });
};
