import { Sequelize } from "sequelize";
import config from "./config.js";

export const database = new Sequelize(
  config.db_name,
  config.db_user,
  config.db_pass,
  {
    dialect: "mysql",
    host: config.db_host,
  }
);

export const connectToDb = () =>
  database.authenticate().then(() => {
    console.log("Connected to DB");
  });
