import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";

const createUserIntoDB = async (payload: TUser) => {
  const isUserExist = await User.findOne({ email: payload.email });
  if (isUserExist) {
    throw new Error("This user already exist");
  }
  const result = await User.create(payload);
  return result;
};

export const AuthServices = {
  createUserIntoDB,
};
