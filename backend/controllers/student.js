import Student from "../models/students.js";
import crypto from "node:crypto";
import catchAsync from "../utils/catchAsync.js";
import { Op } from "sequelize";
import { BadRequestError } from "../utils/errors.js";
import path from "node:path";

export const registerStudent = catchAsync(async (req, res) => {
  const body = req.body;
  const file = req.file;
  const paymentSession = crypto.randomBytes(32).toString("hex");
  const paymentSessionExp = Date.now() + 1000 * 60 * 30;
  body.paymentSession = paymentSession;
  body.paymentSessionExp = paymentSessionExp;
  if (file) {
    const olevelResult = `${file.destination}${file.filename}`.slice(17);
    body.olevelResult = req.protocol + "://" + req.get("host") + olevelResult;
  }
  const student = await Student.findOne({
    where: {
      [Op.or]: [{ email: body.email }, { phone: body.phone }],
    },
  });
  if (student) {
    const keys = Object.keys(body);
    for (let i = 0; i < keys.length; i++) {
      student[keys[i]] = body[keys[i]];
    }
    await student.save();
    return res.status(200).json({
      success: true,
      message: "session updated!",
      data: {
        paymentSession,
        paymentSessionExp,
        status: student.status,
      },
    });
  }
  await Student.create(body);
  res.status(201).json({
    success: true,
    message: "session created!",
    data: {
      paymentSession,
      paymentSessionExp,
      status: "pending",
      balance: 120000,
    },
  });
});

export const returningStudent = catchAsync(async (req, res) => {
  const body = req.body;
  const student = await Student.findOne({
    where: {
      [Op.and]: [{ email: body.email }, { phone: body.phone }],
    },
  });
  if (!student) throw new BadRequestError("Student not found");
  const paymentSession = crypto.randomBytes(32).toString("hex");
  const paymentSessionExp = Date.now() + 1000 * 60 * 30;
  student.paymentSession = paymentSession;
  student.paymentSessionExp = paymentSessionExp;
  await student.save();
  res.status(200).json({
    success: true,
    message: "session updated!",
    data: {
      paymentSession,
      paymentSessionExp,
      status: student.status,
      balance: 120000 - Number(student.amountPaid),
    },
  });
});
export const updateStatus = catchAsync(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  const student = await Student.findByPk(id);
  student["status"] = status;
  await student.save();
  res.status(200).json({ success: true, message: "status updated" });
});

export const getSLip = catchAsync(async (req, res) => {
  const { sessionId } = req.params;
  const user = await Student.findOne({ where: { paymentSession: sessionId } });
  if (!user || user.status !== "verified") {
    return res.redirect("/register");
  }
  if (Date.now() > Date.parse(user.paymentSessionExp)) {
    return res.redirect("/register");
  }
  res.render(path.join("slip"), {
    student: user,
  });
});
