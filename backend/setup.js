import { Sequelize } from "sequelize";
import User from "./models/user.js";
import bcrypt from "bcryptjs";
import config from "./utils/config.js";

(async function () {
  console.log("Setting up Database setup 🖥️");
  const db = new Sequelize(config.db_name, config.db_user, config.db_pass, {
    dialect: "mysql",
    host: config.db_host,
  });
  try {
    console.log("Creating database connection 🌐");
    await db.authenticate().then();
    console.log("Syncing tables to database 📑");
    await db.sync();
    const user = await User.findOne();
    if (!user) {
      console.log("❌ No User found!");
      const userData = {
        username: "Administrator",
        email: "admin@localhost.dev",
        password: await bcrypt.hash("developer", 12),
      };
      console.log("Creating admin user ...👤");
      const newUser = await User.create(userData);
      console.log(`Admin User created ✅ \n email:${newUser.email}`);
    } else {
      console.log(`Admin User found ✅ \n email:${user.email}`);
    }
  } catch (error) {
    console.log("Failed setting up database ❌ \n reason:", error);
  } finally {
    console.log("Closing connection ❌🌐");
    await db.close();
  }
})();
