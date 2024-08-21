import { JwtPayload } from "jsonwebtoken";
import { User } from "./user.model";
import { TUser } from "./user.interface";

const getProfileFromDB = async (payload: JwtPayload) => {
  const result = await User.findOne({ email: payload.email });
  return result;
};

const updateProfileIntoDB = async (
  payload: JwtPayload,
  userData: Partial<TUser>
) => {
  const result = await User.findOneAndUpdate(
    { email: payload.email },
    userData,
    { new: true }
  ).select("-createdAt -updatedAt -__v");
  return result;
};

export const UserServices = {
  getProfileFromDB,
  updateProfileIntoDB,
};
