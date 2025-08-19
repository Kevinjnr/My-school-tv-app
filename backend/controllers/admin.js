import catchAsync from "../utils/catchAsync.js";
import User from "../models/user.js";
import Student from "../models/students.js";
import Payment from "../models/payments.js";
import { database } from "../utils/db.js";
import { Op } from "sequelize";

export const profile = catchAsync(async (req, res) => {
  const user = await User.findByPk(req.user.id);
  res
    .status(200)
    .json({ success: true, message: "Profile retrieved", data: user });
});

export const dashboardStats = catchAsync(async (req, res) => {
  const totalRegistered = await Student.count();
  const totalTransactions = await Payment.count();
  const transactions = await Payment.findOne({
    where: { status: "success" },
    attributes: [
      [database.fn("SUM", database.col("amount")), "total_paid"],
      [database.fn("COUNT", database.col("id")), "total_count"],
    ],
  });
  const recentlyRegistered = await Student.findAll({
    limit: 5,
    order: [["createdAt", "DESC"]],
  });
  res.json({
    message: "success",
    success: true,
    data: {
      transactions,
      totalRegistered,
      totalTransactions,
      recentlyRegistered,
    },
  });
});
export const studentStats = catchAsync(async (req, res) => {
  const totalStudent = await Student.count();
  const pendingStudent = await Student.count({ where: { status: "pending" } });
  const verifiedStudent = await Student.count({
    where: { status: "verified" },
  });
  const { q, page = 1, limit = 2 } = req.query;
  let whereQuery = {};
  let offset = (page - 1) * limit;
  if (q) {
    whereQuery[Op.or] = [
      { firstname: { [Op.like]: `%${q}%` } },
      { lastname: { [Op.like]: `%${q}%` } },
      { status: { [Op.like]: `%${q}%` } },
      { amountPaid: { [Op.like]: `%${q}%` } },
    ];
  }
  const students = await Student.findAll({
    where: whereQuery,
    order: [["createdAt", "DESC"]],
    limit: Number(limit),
    offset: offset,
  });
  const total = await Student.count({ where: whereQuery });
  const total_pages = Math.ceil(total / Number(limit));

  res.status(200).json({
    success: true,
    message: "Students retrieved",
    data: {
      totalStudent,
      pendingStudent,
      verifiedStudent,
      students,
      meta: {
        current_page: page,
        isNextPageAvailable: page >= total_pages,
        isPrevPageAvailable: page == 1,
        total_pages,
      },
    },
  });
});

export const paymentStats = catchAsync(async (req, res) => {
  const { q, page = 1, limit = 10 } = req.query;
  const whereQuery = {};
  let offset = (page - 1) * limit;
  if (q) {
    whereQuery[Op.or] = [
      { fullname: { [Op.like]: `%${q}%` } },
      { email: { [Op.like]: `%${q}%` } },
      { sessionId: { [Op.like]: `%${q}%` } },
      { reference: { [Op.like]: `%${q}%` } },
      { status: { [Op.like]: `%${q}%` } },
      { amount: { [Op.like]: `%${q}%` } },
    ];
  }
  const totalPayment = await Payment.count();
  const pendingPayment = await Payment.count({ where: { status: "pending" } });
  const transactions = await Payment.findOne({
    attributes: [[database.fn("SUM", database.col("amount")), "total_paid"]],
  });
  const payments = await Payment.findAll({
    where: whereQuery,
    order: [["createdAt", "DESC"]],
    limit: limit,
    offset: offset,
  });
  const total = await Payment.count({ where: whereQuery });
  const total_pages = Math.ceil(total / Number(limit));
  res.status(200).json({
    success: true,
    message: "Retrieved payments",
    data: {
      totalPayment,
      pendingPayment,
      transactions,
      payments,
      meta: {
        current_page: page,
        isNextPageAvailable: page >= total_pages,
        isPrevPageAvailable: page == 1,
        total_pages,
      },
    },
  });
});
