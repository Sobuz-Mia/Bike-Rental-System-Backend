import { NextFunction, Request, Response } from "express";
import catchAsync from "../utils/catchAsync";
import AppError from "../error/AppError";
import httpStatus from "http-status";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { User } from "../modules/User/user.model";

const auth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    // checking the token is send from client
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, "You  are not authorized");
    }
    // checking the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_token_secret as string
    ) as JwtPayload;
    const { email, role } = decoded;
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(httpStatus.UNAUTHORIZED, "This User not found");
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
