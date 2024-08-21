import { Model } from "mongoose";

export interface TBike {
  name: string;
  description: string;
  pricePerHour: number;
  cc: number;
  year: number;
  model: string;
  brand: string;
  isAvailable: boolean;
}
export interface BikeModel extends Model<TBike> {
  isBikeExist(id: string): Promise<TBike>;
}
