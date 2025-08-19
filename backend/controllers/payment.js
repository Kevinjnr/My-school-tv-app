import catchAsync from "../utils/catchAsync.js";
import paymentService from "../utils/paymentService.js";
import Student from "../models/students.js";
import { BadRequestError } from "../utils/errors.js";
import config from "../utils/config.js";
import Payment from "../models/payments.js";

export const startPayment = catchAsync(async (req, res) => {
  const { paymentSession, amount } = req.body;
  const student = await Student.findOne({
    where: { paymentSession: paymentSession },
  });
  if (!student) throw new BadRequestError("Invalid session");
  if (Date.now() > Date.parse(student.paymentSessionExp)) {
    throw new BadRequestError("session expired!");
  }
  const paymentData = {
    full_name: `${student.firstname} ${student.lastname}`,
    amount,
    email: student.email,
    sessionId: paymentSession,
    studentId: student.id,
  };
  const response = await paymentService.startPayment(paymentData);
  res.status(201).json({
    success: true,
    message: "Payment started!",
    data: response,
  });
});

export const createPayment = catchAsync(async (req, res) => {
  const payment = await paymentService.createPayment(req.query);
  if (payment && payment.status == "success") {
    const student = await Student.findByPk(payment.studentId);
    student.amountPaid = Number(student.amountPaid) + Number(payment.amount);
    student.status =
      Number(payment.amount) + Number(student.amountPaid) >= 120000
        ? "verified"
        : student.status;
    await student.save();
  }
  res.redirect(`${config.client}/register`);
});

export const updatePayment = catchAsync(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  const payment = await Payment.findByPk(id);
  payment["status"] = status;
  await payment.save();
  res.status(200).json({ success: true, message: "payment updated" });
});
