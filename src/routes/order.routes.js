import { Router } from "express";
const router = Router();

import { verifyLogin } from "../middlewares/index.js";
import { authJwt } from "../middlewares/index.js";
import * as ordersCtrl from "../controllers/order.controller.js";

router.get("/",[authJwt.verifyToken, authJwt.isAdmin] , ordersCtrl.getOrders);
router.post("/", ordersCtrl.createOrder);
router.delete(
  "/:orderId",
  [authJwt.verifyToken, authJwt.isAdmin],
  ordersCtrl.deleteOrderById
);

export default router;

/**
* @swagger
* /api/orders:
*  get:
*    tags: [orders]
*    summary: orders
*    security:
*      - bearerAuth: []
*    description: List of orders
*    parameters:
*       - in: query
*         name: index
*         required: true
*         description: Index del user logged.
*         schema:
*           type: integer
*           example: -1
*    responses:
*       200:
*         description: List of orders
*/

/**
* @swagger
* /api/orders:
*  post:
*    tags: [orders]
*    summary: new order
*    security:
*      - bearerAuth: []
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            type: object
*            required:
*              - idUser
*              - products
*            properties:
*               idUser:
*                 description: user id
*                 type: string
*               products:
*                 description: products of orders
*                 type: array
*            example:
*              idUser: 61744f24862a9c8bf9c9db1d
*              products: [{idProduct: 618d58fc0e95d5fb51ec141f,
*                         amount: 2}]
*    responses:
*      201:
*       description: order created
*/