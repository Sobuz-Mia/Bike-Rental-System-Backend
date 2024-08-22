import { Router } from "express";
import { AuthControllers } from "./auth.controller";
import validateRequest from "../../middleware/validateRequest";
import { userValidations } from "../User/user.validation";
import { LoginValidation } from "./auth.validation";

const router = Router();

router.post(
  "/signup",
  validateRequest(userValidations.createUserValidationSchema),
  AuthControllers.createUser,
);
router.post(
  "/login",
  validateRequest(LoginValidation.loginValidation),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
