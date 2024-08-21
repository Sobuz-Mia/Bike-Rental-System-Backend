import { JwtPayload } from "jsonwebtoken";
import { User } from "./user.model";

const getProfileFromDB = async (payload: JwtPayload) => {
  const result = await User.findOne({ email: payload.email });
  return result;
};

const updateProfileIntoDB = async (payload: JwtPayload) => {
  const result = await User.findOne({ email: payload.email });
  return result;
};

export const UserServices = {
  getProfileFromDB,
};
