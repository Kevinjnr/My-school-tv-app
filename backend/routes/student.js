import { Router } from "express";
import * as controller from "../controllers/student.js";
import fileupload from "../middlewares/fileupload.js";
import auth from "../middlewares/auth.js";

const router = Router();
router
  .route("/register")
  .post(fileupload.single("olevelResult"), controller.registerStudent);
router.route("/returning").post(auth, controller.returningStudent);
router.route("/status/:id").patch(auth, controller.updateStatus);
router.route("/slip/:sessionId").get(controller.getSLip);

export default router;
