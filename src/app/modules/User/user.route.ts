import { Router } from "express";
import { UserControllers } from "./user.controller";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { userValidations } from "./user.validation";

const router = Router();

router.get("/me", auth("user"), UserControllers.getProfile);
router.get("/", auth("admin"), UserControllers.getAllUsers);
router.put("/:id", auth("admin"), UserControllers.DeleteUser);
router.patch("/:id", auth("admin"), UserControllers.userPromotion);
router.put(
  "/me",
  auth("user", "admin"),
  validateRequest(userValidations.updateValidationSchema),
  UserControllers.UpdateProfile
);

export const UserRoutes = router;
