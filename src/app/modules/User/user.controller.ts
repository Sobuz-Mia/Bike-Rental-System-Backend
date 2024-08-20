import { Request, Response } from "express";
import { z } from "zod";

const createUser = async (req: Request, res: Response) => {
  try {
    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({
        success: false,
        message: "Validation error",
        errors: err.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
      });
    } else {
      if (err instanceof Error) {
        res.status(400).json({
          success: false,
          message: err.message,
        });
      }
    }
  }
};

export const UserControllers = {
  createUser,
};
