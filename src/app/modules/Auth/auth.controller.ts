import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AuthServices } from "./auth.services";
import config from "../../config";
const createUser = catchAsync(async (req, res) => {
  const result = await AuthServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});
const loginUser = catchAsync(async (req, res) => {
  const { refreshToken, accessToken, userData } = await AuthServices.loginUser(
    req.body
  );
  res.cookie("refreshToken", refreshToken, {
    secure: config.NODE_ENV === "production",
    httpOnly: true,
  });
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "User logged in successfully",
    data: { accessToken, userData },
  });
});
const refreshToken = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refreshToken);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Refresh Token generated successfully",
    data: result,
  });
});

export const AuthControllers = {
  createUser,
  loginUser,
  refreshToken,
};
