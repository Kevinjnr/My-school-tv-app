import User from "../models/user.js";
import catchAsync from "../utils/catchAsync.js";
import { Op } from "sequelize";
import { BadRequestError } from "../utils/errors.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import config from "../utils/config.js";

export const signin = catchAsync(async (req, res) => {
  const { email, username, password } = req.body;
  const user = await User.findOne({
    where: { [Op.or]: { email: email || "", username: username || "" } },
  });
  if (!user) {
    throw new BadRequestError("Incorrect creditials");
  }
  const doMatch = bcrypt.compare(password, user.password);
  if (!doMatch) {
    throw new BadRequestError("Incorrect creditials");
  }
  const accessToken = jwt.sign({ id: user.id }, config.jwt_secret);
  res
    .status(200)
    .json({ success: true, message: "Signin successful", accessToken });
});
