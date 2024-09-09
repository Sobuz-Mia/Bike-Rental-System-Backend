import jwt, { JwtPayload } from "jsonwebtoken";
import { Types } from "mongoose";
export const createToken = (
  jwtPayload: { email: string; role: string; userId: string | Types.ObjectId },
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(
    {
      ...jwtPayload,
      userId: jwtPayload.userId.toString(),
    },
    secret,
    { expiresIn }
  );
};

export const verifyToken = (token: string, secret: string) => {
  return jwt.verify(token, secret) as JwtPayload;
};
