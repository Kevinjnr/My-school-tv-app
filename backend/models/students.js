import { database } from "../utils/db.js";
import Sequelize from "sequelize";

const Student = database.define("student", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  firstname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  lastname: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  nationality: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  stateOfOrigin: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  dateOfBirth: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  olevelResult: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  firstSchoolOfChoice: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  secondSchoolOfChoice: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  amountPaid: {
    type: Sequelize.DECIMAL,
    allowNull: false,
    defaultValue: 0.0,
  },
  status: {
    type: Sequelize.ENUM(["pending", "verified"]),
    allowNull: false,
    defaultValue: "pending",
  },
  paymentSession: {
    type: Sequelize.STRING,
  },
  paymentSessionExp: {
    type: Sequelize.DATE,
  },
});

export default Student;
