import { Router } from "express";
import * as controller from "../controllers/admin.js";

const router = Router();

router.route("/profile").get(controller.profile);
router.route("/dashboard/stats").get(controller.dashboardStats);
router.route("/students/stats").get(controller.studentStats);
router.route("/payments/stats").get(controller.paymentStats);

export default router;
