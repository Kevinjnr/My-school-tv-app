import * as controller from "../controllers/payment.js";
import { Router } from "express";

const router = Router();

router.route("/").post(controller.startPayment).get(controller.createPayment);
router.route("/:id").patch(controller.updatePayment);

export default router;
