import { database } from "../utils/db.js";
import Sequelize from "sequelize";

const User = database.define(
  "user",
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM(["active", "deactivated"]),
      allowNull: false,
      defaultValue: "active",
    },
  },
  {
    timestamps: true,
  }
);

export default User;
