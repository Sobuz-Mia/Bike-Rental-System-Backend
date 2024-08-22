import { Model } from "mongoose";
import { USER_ROLE } from "./user.constant";

export interface TUser {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  role: "admin" | "user";
}

export interface UserModel extends Model<TUser> {
  isPasswordMatch(
    planTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}

export type TUserRole = keyof typeof USER_ROLE;
