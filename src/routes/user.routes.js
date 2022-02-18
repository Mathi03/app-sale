import { Router } from "express";
const router = Router();

import * as userController from "../controllers/user.controller";
import { authJwt, verifySignUp } from "../middlewares";

router.get("/", [authJwt.verifyToken, authJwt.isAdmin],
  userController.getUsers);
router.get("/:userId", 
  [authJwt.verifyToken, authJwt.isAdmin],
  userController.getUserId);
router.post(
  "/",
  [
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignUp.checkDuplicateUsernameOrEmail,
  ],
  userController.createUser
);
router.put('/:userId', [authJwt.verifyToken, authJwt.isAdmin], userController.updateUserById);

router.delete("/:userId", [authJwt.verifyToken, authJwt.isAdmin], userController.deteleUserById)
export default router;
