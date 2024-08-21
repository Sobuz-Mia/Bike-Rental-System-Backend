import { Router } from "express";
import { UserControllers } from "./user.controller";
import auth from "../../middleware/auth";

const router = Router();

router.get("/me", auth(), UserControllers.getProfile);
router.put("/me", auth(), UserControllers.UpdateProfile);

export const UserRoutes = router;
