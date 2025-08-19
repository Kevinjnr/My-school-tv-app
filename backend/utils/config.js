import dotenv from "dotenv";
dotenv.config();
const env = process.env;

export default {
  db_name: env.DB_NAME,
  db_user: env.DB_USER,
  db_pass: env.DB_PASS,
  db_host: env.DB_HOST,
  port: env.PORT || 6000,
  jwt_secret: env.JWT_SECRET,
  client: "http://localhost:5173",
};
