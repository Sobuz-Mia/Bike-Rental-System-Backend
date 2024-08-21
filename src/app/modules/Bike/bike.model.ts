import { model, Schema } from "mongoose";
import { BikeModel, TBike } from "./bike.interface";
import AppError from "../../error/AppError";
import httpStatus from "http-status";

const bikeSchema = new Schema<TBike, BikeModel>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  cc: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  model: {
    type: String,
    required: true,
  },
  brand: {
    type: String,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

bikeSchema.pre("save", async function (next) {
  const isBikeExist = await Bikes.findOne({ name: this.name });
  if (isBikeExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `The ${this.name} is already exist`
    );
  }
  next();
});
bikeSchema.pre("save", async function (next) {
  const isBikeExist = await Bikes.findOne({ name: this.name });
  if (isBikeExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `The ${this.name} is already exist`
    );
  }
  next();
});
bikeSchema.statics.isBikeExist = async function (id) {
  return await Bikes.findOne({ _id: id });
};

export const Bikes = model<TBike, BikeModel>("bikes", bikeSchema);
