import axios from "axios";
import Payment from "../models/payments.js";
import _ from "lodash";
import { paystack } from "../utils/paystack.js";
const { initializePayment, verifyPayment } = paystack(axios);
import { BadRequestError } from "./errors.js";

class PaymentService {
  startPayment(data) {
    return new Promise(async (resolve, reject) => {
      try {
        const formData = _.pick(data, [
          "amount",
          "email",
          "full_name",
          "sessionId",
          "studentId",
        ]);
        formData.metadata = {
          full_name: formData.full_name,
          sessionId: formData.sessionId,
          studentId: formData.studentId,
        };
        formData.amount *= 100;
        const response = await initializePayment(formData);
        return resolve(response.data);
      } catch (error) {
        error.source = "Start Payment Service";
        return reject(error);
      }
    });
  }
  createPayment(req) {
    const ref = req.reference;
    if (!ref) {
      throw new BadRequestError("No reference passed in query!");
    }
    return new Promise(async (resolve, reject) => {
      try {
        const response = await verifyPayment(ref);
        const { reference, amount, status } = response.data.data;
        const { email } = response.data.data.customer;
        const { full_name, sessionId, studentId } = response.data.data.metadata;
        const newPayment = {
          reference,
          amount: amount / 100,
          email,
          fullname: full_name,
          status,
          sessionId,
          studentId,
        };
        const existingPayment = await Payment.findOne({
          where: { reference: reference },
        });
        let payment;
        let stat = "not set";
        if (existingPayment) {
          stat = existingPayment.status;
          existingPayment.status = status;
          payment = await existingPayment.save();
        } else {
          payment = await Payment.create(newPayment);
        }
        return resolve(stat == newPayment.status ? null : payment);
      } catch (error) {
        error.source = "Create Payment Service";
        return reject(error);
      }
    });
  }
  paymentReceipt(body) {
    return new Promise(async (resolve, reject) => {
      try {
        const reference = body.reference;
        const transaction = Payment.findOne({ reference: reference });
        return resolve(transaction);
      } catch (error) {
        error.source = "Create Payment Service";
        return reject(error);
      }
    });
  }
}

export default new PaymentService();
