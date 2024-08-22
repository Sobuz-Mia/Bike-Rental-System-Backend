import { Router } from "express";
import auth from "../../middleware/auth";
import { BikeController } from "./bike.controller";
import validateRequest from "../../middleware/validateRequest";
import { BikeValidation } from "./bike.validation";

const router = Router();

router.post(
  "/",
  auth("admin"),
  validateRequest(BikeValidation.createBikeValidation),
  BikeController.createBike,
);
router.get("/", BikeController.getAllBike);
router.delete("/:id", BikeController.deleteBike);
router.put(
  "/:id",
  auth("admin"),
  validateRequest(BikeValidation.updateBikeValidation),
  BikeController.updateBike,
);

export const BikeRoutes = router;
