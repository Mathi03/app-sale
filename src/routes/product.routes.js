import { Router } from "express";
import { verifyCreateProduct } from "../middlewares";
const router = Router();

import * as productController from "../controllers/product.controller";
import { authJwt } from "../middlewares";
router.get("/", productController.getProducts);

router.get("/:productId", productController.getProductById);
router.post(
  "/",
  [authJwt.verifyToken, authJwt.isAdmin, verifyCreateProduct.checkDuplicateBarcode ],
  productController.createProduct
);

router.put(
  "/:productId",
  [authJwt.verifyToken, authJwt.isAdmin],
  productController.updateProductById
);

router.delete(
  "/:productId",
  [authJwt.verifyToken, authJwt.isAdmin],
  productController.deleteProductById
);

export default router;
