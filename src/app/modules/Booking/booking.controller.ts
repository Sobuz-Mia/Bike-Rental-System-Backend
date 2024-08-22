import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookingServices } from "./booking.services";

const createRental = catchAsync(async (req, res) => {
  const result = await BookingServices.createRentalIntoDB(req.body, req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rental created successfully",
    data: result,
  });
});
const returnBikeFromClient = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await BookingServices.returnBikeFromClientIntoDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Bike returned successfully",
    data: result,
  });
});
const getAllRentals = catchAsync(async (req, res) => {
  const { userId } = req.user;
  const result = await BookingServices.getAllRentalsFromDB(userId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Rentals retrieved successfully",
    data: result,
  });
});
export const BookingController = {
  createRental,
  returnBikeFromClient,
  getAllRentals,
};
