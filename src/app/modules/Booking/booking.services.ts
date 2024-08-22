import { JwtPayload } from "jsonwebtoken";
import { TBooking } from "./booking.interface";
import { User } from "../User/user.model";
import AppError from "../../error/AppError";
import httpStatus from "http-status";
import { Bikes } from "../Bike/bike.model";
import { Booking } from "./booking.model";

const createRentalIntoDB = async (
  payload: TBooking,
  jwtPayload: JwtPayload
) => {
  // checking is user exist
  const isUserExist = await User.findById(jwtPayload?.userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This User not found!");
  }
  //   checking is bike exist
  const isBikeExist = await Bikes.findOne({ _id: payload?.bikeId });
  if (!isBikeExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This Bike not found!");
  }
  // checking bike is available or not
  if (isBikeExist.isAvailable === false) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "This Bike is not available right now!"
    );
  }
  //   set userId from jwt payload
  payload.userId = jwtPayload.userId;
  isBikeExist.isAvailable = false;

  const result = await Booking.create(payload);
  await isBikeExist.save();
  return result;
};
const returnBikeFromClientIntoDB = async (id: string) => {
  const isBookingExist = await Booking.findById(id);
  if (!isBookingExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This rental bike is not found ");
  }
  // checking is bike exist
  const isBikeExist = await Bikes.findOne({ _id: isBookingExist.bikeId });
  if (!isBikeExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This bike not found");
  }
  isBikeExist.isAvailable = true;
  await isBikeExist.save();
  // calculate total cost
  const currentTime: Date = new Date();
  const durationInHours = Math.ceil(
    (currentTime.getTime() - new Date(isBookingExist.startTime).getTime()) /
      (1000 * 60 * 60)
  );
  const totalCost = durationInHours * isBikeExist?.pricePerHour;
  isBookingExist.returnTime = currentTime;
  isBookingExist.totalCost = totalCost;
  isBookingExist.isReturned = true;
  await isBookingExist.save();
  return isBookingExist;
};
const getAllRentalsFromDB = async (userId: string) => {
  const isUserExist = await User.findById(userId);
  if (!isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This User not found!");
  }
  const result = await Booking.find({ userId });
  return result;
};
export const BookingServices = {
  createRentalIntoDB,
  returnBikeFromClientIntoDB,
  getAllRentalsFromDB,
};
