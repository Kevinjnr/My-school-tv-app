import { Router } from "express";
import * as controller from "../controllers/auth.js";

const router = Router();
router.route("/signin").post(controller.signin);

export default router;
