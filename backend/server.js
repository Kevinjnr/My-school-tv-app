import express from "express";
import http from "node:http";
import config from "./utils/config.js";
const app = express();
const port = config.port;
import { connectToDb } from "./utils/db.js";
import cors from "cors";
import User from "./models/user.js";
import Student from "./models/students.js";
import Payment from "./models/payments.js";
import logger from "morgan";

import { database } from "./utils/db.js";
import authRoutes from "./routes/auth.js";
import studentRoutes from "./routes/student.js";
import paymentRoutes from "./routes/payment.js";
import adminRoutes from "./routes/admin.js";
import error from "./middlewares/error.js";
import auth from "./middlewares/auth.js";
import ejs from "ejs";
import path from "node:path";

const __dirname = path.resolve();
app.use(express.static("./backend/uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(logger("dev"));
app.set("view engine", "ejs");
app.engine("ejs", ejs.renderFile);
app.set("views", path.join(__dirname, "backend", "views"));
app.use("/api/auth", authRoutes);
app.use("/api/student", studentRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/admin", auth, adminRoutes);
if (process.env.NODE_ENV == "production") {
  let frontendPath = path.join(__dirname, "frontend", "dist");
  app.use(express.static(frontendPath));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}
app.use(error);

Payment.belongsTo(Student);
Student.hasMany(Payment);
const server = http.createServer(app);
connectToDb()
  .then(() => database.sync())
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });
