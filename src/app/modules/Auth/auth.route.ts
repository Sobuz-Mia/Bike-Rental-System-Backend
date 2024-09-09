import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { userValidations } from "../User/user.validation";
import { LoginValidation } from "./auth.validation";

const router = Router();

router.post(
  "/signup",
  validateRequest(userValidations.createUserValidationSchema),
  AuthControllers.createUser
);
router.post(
  "/login",
  validateRequest(LoginValidation.loginValidation),
  AuthControllers.loginUser
);

router.post(
  "/refresh-token",
  validateRequest(LoginValidation.refreshTokenValidationSchema),
  AuthControllers.refreshToken
);
export const AuthRoutes = router;
