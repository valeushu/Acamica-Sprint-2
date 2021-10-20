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
router.get("/:productId", productsCtrl.getProductById);
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
