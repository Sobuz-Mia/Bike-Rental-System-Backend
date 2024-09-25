import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { UserServices } from "./user.services";

const getAllUsers = catchAsync(async (req, res) => {
  const result = await UserServices.getAllUserFromDB();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrieved successfully",
    data: result,
  });
});
const getProfile = catchAsync(async (req, res) => {
  const result = await UserServices.getProfileFromDB(req.user);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User profile retrieved successfully",
    data: result,
  });
});
const UpdateProfile = catchAsync(async (req, res) => {
  const result = await UserServices.updateProfileIntoDB(req.user, req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Profile updated successfully",
    data: result,
  });
});
const DeleteUser = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.deletedUserFromDB(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Deleted successfully",
    data: result,
  });
});
const userPromotion = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.userPromotionToAdmin(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Promoted to Admin successfully",
    data: result,
  });
});

export const UserControllers = {
  userPromotion,
  DeleteUser,
  getProfile,
  UpdateProfile,
  getAllUsers,
};
