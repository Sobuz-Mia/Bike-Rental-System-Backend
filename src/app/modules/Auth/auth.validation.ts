import { z } from "zod";

const loginValidation = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: "Refresh token is required !" }),
  }),
});
// const refreshTokenValidations = z.object({
//   cookies: z.object({
//     refreshToken: z.string({ required_error: "Refresh token is required !" }),
//   }),
// });
export const LoginValidation = {
  loginValidation,
  refreshTokenValidationSchema,
};
