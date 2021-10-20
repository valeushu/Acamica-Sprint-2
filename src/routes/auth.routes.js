import { Router } from "express";
const router = Router();

import * as authCtrl from "../controllers/auth.controller.js";
import { verifySignup } from "../middlewares/index.js";

router.post(
  "/signup",
  [verifySignup.checkDuplicateEmail, verifySignup.checkRolesExisted],
  authCtrl.signup
);
router.post("/login", authCtrl.login);

export default router;