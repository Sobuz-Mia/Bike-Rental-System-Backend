import { Router } from "express";
import auth from "../../middleware/auth";
import { BookingController } from "./booking.controller";
import validateRequest from "../../middleware/validateRequest";
import { BikeRentalValidation } from "./booking.validation";

const router = Router();

router.post(
  "/",
  auth("user"),
  validateRequest(BikeRentalValidation.createBikeRentalValidationSchema),
  BookingController.createRental
);
router.get("/", auth("user"), BookingController.getAllRentals);
router.put(
  "/:id/return",
  auth("admin"),
  BookingController.returnBikeFromClient
);

export const BookingRoutes = router;
