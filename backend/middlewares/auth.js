import { AuthenticationError } from "../utils/errors.js";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";
import User from "../models/user.js";

export default async function (req, res, next) {
  try {
    const token =
      req.headers["authorization"] &&
      req.headers["authorization"]?.split(" ")[1];
    if (!token) {
      throw new AuthenticationError("invalid token");
    }
    const decoded = jwt.verify(token, config.jwt_secret);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      throw new AuthenticationError("Invalid auth token");
    }
    req.user = user;
    next();
  } catch (error) {
    throw new AuthenticationError(error);
  }
}
