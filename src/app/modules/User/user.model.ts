/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../config";

const userSchema = new Schema<TUser, UserModel>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
    },
  },
  {
    timestamps: true,
  },
);

// password hashed using pre hooks

userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});
// set "" after saving password
userSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});
userSchema.statics.isPasswordMatch = async function (
  planTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(planTextPassword, hashedPassword);
};
export const User = model<TUser, UserModel>("user", userSchema);
