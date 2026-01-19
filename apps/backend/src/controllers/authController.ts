import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import { generateToken } from "../lib/jwt.js";
import { sendSuccess, sendError } from "../utils/response.js";

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      sendError(res, "Email and password are required", 400);
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email },
      include: { company: true, employee: true },
    });

    if (!user) {
      sendError(res, "Invalid credentials", 401);
      return;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      sendError(res, "Invalid credentials", 401);
      return;
    }

    if (!user.isActive) {
      sendError(res, "Account is inactive", 403);
      return;
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    sendSuccess(
      res,
      {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
      "Login successful"
    );
  } catch (error) {
    console.error("Login error:", error);
    sendError(res, "Internal server error", 500);
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password, firstName, lastName } = req.body;

    if (!email || !password || !firstName) {
      sendError(res, "Email, password, and first name are required", 400);
      return;
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      sendError(res, "User with this email already exists", 409);
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        firstName,
        lastName,
      },
    });

    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    sendSuccess(
      res,
      {
        token,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      },
      "Registration successful",
      201
    );
  } catch (error) {
    console.error("Registration error:", error);
    sendError(res, "Internal server error", 500);
  }
};
