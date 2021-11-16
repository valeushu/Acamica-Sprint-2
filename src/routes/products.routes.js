import { Router } from "express";
const router = Router();
import * as productsCtrl from "../controllers/products.controller.js";
import { authJwt } from "../middlewares/index.js";

router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin],
  productsCtrl.createProduct
);
router.get("/", productsCtrl.getProducts);
router.get(
  "/:productId",
  [authJwt.verifyToken, authJwt.isAdmin],
  productsCtrl.getProductById
);
router.put(
  "/:productId",
  [authJwt.verifyToken, authJwt.isAdmin],
  productsCtrl.updateProductById
);
router.delete(
  "/:productId",
  [authJwt.verifyToken, authJwt.isAdmin],
  productsCtrl.deleteProductById
);

export default router;

/**
* @swagger
* /api/products:
*  post:
*    tags: [products]
*    summary: new product.
*    security:
*      - bearerAuth: []
*    requestBody:
*      required: true
*      content:
*        application/json:
*          schema:
*            type: object
*            required:
*              - name
*              - description
*              - price
*              - imgUrl
*            properties:
*               name:
*                 description: product name
*                 type: string
*               description:
*                 description: product description
*                 type: string
*               price:
*                 description: product price
*                 type: float
*               imgUrl:
*                 description: product image
*                 type: string
*            example:
*              name: green salad
*              description: green salad whith
*              price: 200
*              imgUrl: imgeproduct.jpg
*    responses:
*      201:
*       description: Product create
*/

/**
* @swagger
* /api/products:
*  get:
*    tags: [products]
*    summary: products
*    description: List of products
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
*         description: List of products
*/

/**
* @swagger
* /api/products/{productId}:
*  get:
*    summary: Get product by ID (Only Admins).
*    security:
*      - bearerAuth: []
*    tags: [products]
*    description : Get product by ID.
*    consumes:
*      - application/json
*    parameters:
*      - name: productId
*        in: path
*        description: product ID
*        required: true
*        type: string
*        schema: 
*          type: string
*          example: 61746334627287c4a3043a70
*    responses:
*      200:
*       description: Get product success
*
*/

/**
* @swagger
* /api/products/{productId}:
*  put:
*    summary: products.
*    tags: [products] 
*    description : product update
*    security:
*      - bearerAuth: []
*    parameters:
*      - in: path
*        name: productId
*        required: true
*        description: id product updated
*        schema:
*          type: string
*          example: 61746334627287c4a3043a70
*    requestBody:
*        required: true
*        content:
*          application/json:
*            schema:
*              type: object
*              required:
*                - name 
*                - descripti on
*                - price
*                - imgUrl
*              properties:
*                name:
*                  type: string
*                  description: Name Product
*                description:
*                  type: integer
*                  description: Price Product
*                price:
*                  type: string
*                  description: Picture Product
*                imgurl:
*                  type: string
*                  description: image Product
*              example:
*                name: burger green              
*                description: vegan burguer
*                price: 250
*                imgUrl: imageproduct.jpg
*    responses:
*       201:
*        description: Product updated
*/

/**
* @swagger
* /api/products/{productId}:
*  delete:
*     summary: Delete Product (Only Admins).
*     description: Only admins can delete products.
*     tags: [products]
*     security:
*       - bearerAuth: []
*     parameters:
*       - in: path
*         name: productId
*         required: true
*         schema:
*           type: string
*           example: 61746334627287c4a3043a70
*     responses:
*       "200":
*         description: product deleted
*/
