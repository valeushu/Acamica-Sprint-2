import { Router } from "express";
const router = Router();

import * as authCtrl from "../controllers/auth.controller.js";
import { verifySignup , authJwt} from "../middlewares/index.js";

router.post(
  "/signup",
  [verifySignup.checkDuplicateEmail, verifySignup.checkRolesExisted],
  authCtrl.signup
);
router.post("/login", authCtrl.login);
router.get('/me',[authJwt.verifyToken], authCtrl.me)

export default router;

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Create new User
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - fullname
 *               - email
 *               - password
 *               - phone
 *               - address
 *               - roles
 *             properties:
 *                username:
 *                  description: User nickName
 *                  type: string
 *                fullname:
 *                  description: User firstName
 *                  type: string
 *                email:
 *                  description: User email
 *                  type: string
 *                password:
 *                  description: User password
 *                  type: string
 *                phone:
 *                  description: User number phone
 *                  type: string
 *                address:
 *                  description: User address
 *                  type: string
 *                roles: 
 *                  description: User role
 *                  type: array
 *             example:
 *               username: tdfadmin
 *               fullname: tdfadmin amaria
 *               email: tdfadmin@gmail.com
 *               phone: 15777556
 *               address: maipu 1016
 *               password:  password
 *               roles: [admin]
 *     responses:
 *       "200":
 *         description: User Created
 */


//TODO: resetear valores

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: User login 
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - Password
 *             properties:
 *                email:
 *                  description: user email
 *                  type: string
 *                password:
 *                  description: User password
 *                  type: string
 *             example:
 *               email: admin1@gmail.com
 *               password: password
 *     responses:
 *       "200":
 *         description: Success Login
 */

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: logged user 
 *     tags: [users]
 *     description: show data user
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       "200":
 *         description: Success Login
 */
