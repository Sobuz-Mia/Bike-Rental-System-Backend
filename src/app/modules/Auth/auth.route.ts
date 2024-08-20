import { Router } from "express";
import { UserControllers } from "../User/user.controller";

const router = Router();

router.post("/signup", UserControllers.createUser);

export const AuthRoutes = router;
