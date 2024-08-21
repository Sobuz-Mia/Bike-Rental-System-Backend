import { z } from "zod";

const loginValidation = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

export const LoginValidation = {
  loginValidation,
};
