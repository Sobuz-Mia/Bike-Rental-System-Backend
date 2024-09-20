import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TBike } from "./bike.interface";
import { Bikes } from "./bike.model";

const createBikeIntoDB = async (payload: TBike) => {
  const result = await Bikes.create(payload);
  return result;
};

const getAllBikeFromDB = async () => {
  const result = await Bikes.find({ isAvailable: true });
  return result;
};

const getSingleBikeFromDB = async (id: string) => {
  const bike = await Bikes.isBikeExist(id);
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, "This bike not found");
  }
  if (bike.isAvailable === false) {
    throw new AppError(httpStatus.NOT_FOUND, "This item already deleted");
  }
  const result = await Bikes.findById(id);
  return result;
};
const updateBikeIntoDB = async (id: string, payload: Partial<TBike>) => {
  if (!(await Bikes.isBikeExist(id))) {
    throw new AppError(httpStatus.NOT_FOUND, "This item not found");
  }
  const result = await Bikes.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteBikeFromDB = async (id: string) => {
  const bike = await Bikes.isBikeExist(id);
  if (!bike) {
    throw new AppError(httpStatus.NOT_FOUND, "This item not found");
  }
  if (bike.isAvailable === false) {
    throw new AppError(httpStatus.NOT_FOUND, "This item already deleted");
  }
  const result = await Bikes.findByIdAndUpdate(
    id,
    {
      isAvailable: false,
    },
    {
      new: true,
    }
  );
  return result;
};

export const BikeServices = {
  getSingleBikeFromDB,
  createBikeIntoDB,
  getAllBikeFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
};
