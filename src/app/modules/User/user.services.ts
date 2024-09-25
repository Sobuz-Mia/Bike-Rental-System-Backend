import { JwtPayload } from "jsonwebtoken";
import { User } from "./user.model";
import { TUser } from "./user.interface";

const getAllUserFromDB = async () => {
  const result = await User.find({ isDeleted: false });
  return result;
};
const getProfileFromDB = async (payload: JwtPayload) => {
  const result = await User.findOne({ email: payload.email });
  return result;
};
const deletedUserFromDB = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};
const userPromotionToAdmin = async (id: string) => {
  const result = await User.findByIdAndUpdate(
    id,
    { role: "admin" },
    { new: true }
  );
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
  userPromotionToAdmin,
  deletedUserFromDB,
  getProfileFromDB,
  updateProfileIntoDB,
  getAllUserFromDB,
};
