import { Router } from "express";
const router = Router();

import * as authController from "../controllers/auth.controller";
import { verifySignUp } from "../middlewares";

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/signup",
  [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted],
  authController.signUp
);

router.post("/signin", authController.signin);

export default router;
