import httpStatus from "http-status";
import AppError from "../../error/AppError";
import { TUser } from "../User/user.interface";
import { User } from "../User/user.model";
import config from "../../config";
import { TUserLogin } from "./auth.interface";
import { createToken, verifyToken } from "./auth.utils";

const createUserIntoDB = async (payload: TUser) => {
  const isUserExist = await User.findOne({ email: payload.email });
  if (isUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "This user already exist");
  }
  const result = await User.create(payload);
  return result;
};
const loginUser = async (payload: TUserLogin) => {
  const user = await User.findOne({ email: payload.email }).select(
    "+password -createdAt -updatedAt"
  );
  // checking is user exist
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user not found");
  }
  // checking password is correct
  if (!(await User.isPasswordMatch(payload?.password, user?.password))) {
    throw new AppError(httpStatus.FORBIDDEN, "Password is incorrect");
  }
  const userData = {
    _id: user?._id,
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    address: user?.address,
    role: user?.role,
  };
  // create token and send to the client
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    userId: user?._id,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token_secret as string,
    config.jwt_access_expires_in as string
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );
  // const result = await User.create(payload);
  return {
    accessToken,
    refreshToken,
    userData,
  };
};

const refreshToken = async (token: string) => {
  if (!token) {
    throw new AppError(httpStatus.UNAUTHORIZED, "You are not authorized");
  }
  const decoded = verifyToken(token, config.jwt_refresh_secret as string);

  const user = await User.findOne({ email: decoded.email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, "This user not exist");
  }
  // create token and send to the client
  const jwtPayload = {
    email: user?.email,
    role: user?.role,
    userId: user?._id,
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_token_secret as string,
    config.jwt_access_expires_in as string
  );
  return { accessToken };
};
export const AuthServices = {
  createUserIntoDB,
  loginUser,
  refreshToken,
};
