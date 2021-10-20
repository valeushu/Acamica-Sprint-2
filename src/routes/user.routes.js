import { Router } from "express";
const router = Router();
import * as userCtrl from "../controllers/user.controller.js";
import { authJwt, verifySignup } from "../middlewares/index.js";

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin, verifySignup.checkRolesExisted],
  userCtrl.createUser
);
router.get("/", [authJwt.verifyToken, authJwt.isAdmin], userCtrl.getUsers);
router.delete("/:userId", userCtrl.deleteUserById);
export default router;
