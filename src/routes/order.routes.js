import * as orderController from '../controllers/order.controller';
import { authJwt } from '../middlewares';
import { Router } from 'express';
const router = Router();

router.get(
  '/',
  [authJwt.verifyToken, authJwt.isAdmin],
  orderController.getOrders
);
router.get(
  '/:orderId',
  [authJwt.verifyToken, authJwt.isAdmin],
  orderController.getOrderById
);
router.post(
  '/',
  [authJwt.verifyToken],
  orderController.createOrder
);
router.put(
  '/:orderId',
  [authJwt.verifyToken, authJwt.isAdmin],
  orderController.updateOrderById
);
router.delete(
  '/:orderId',
  [authJwt.verifyToken, authJwt.isAdmin],
  orderController.deleteOrderById
);

export default router;
