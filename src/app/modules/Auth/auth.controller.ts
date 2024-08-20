import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AuthServices } from "./auth.services";
const createUser = catchAsync(async (req, res) => {
  const result = await AuthServices.createUserIntoDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: "Student Created successfully",
    data: result,
  });
});

export const AuthControllers = {
  createUser,
};
