import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { prisma } from "../lib/prisma.js";
import { sendSuccess, sendError } from "../utils/response.js";

export const registerClient = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const {
      personalDetails,
      addressDetails,
      planDetails: _planDetails, // Will be used for plan assignment later
      customizeDetails,
    } = req.body;

    // Validate required fields
    if (
      !personalDetails?.email ||
      !personalDetails?.password ||
      !personalDetails?.firstName ||
      !customizeDetails?.organizationName
    ) {
      sendError(res, "Missing required fields", 400);
      return;
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: personalDetails.email },
    });

    if (existingUser) {
      sendError(res, "User with this email already exists", 409);
      return;
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(personalDetails.password, 10);

    // Generate company code
    const companyCode = customizeDetails.organizationName
      .toUpperCase()
      .replace(/\s+/g, "")
      .substring(0, 10);

    // Create company, user, and related records in a transaction
    const result = await prisma.$transaction(async (tx) => {
      // Create company
      const company = await tx.company.create({
        data: {
          name: customizeDetails.organizationName,
          code: companyCode,
          address: addressDetails?.streetAddress,
          city: addressDetails?.city,
          state: addressDetails?.state,
          country: addressDetails?.country || "India",
          pincode: addressDetails?.postalCode,
          email: personalDetails.email,
          phone: personalDetails.mobile,
          gstin: addressDetails?.gstNo,
          pan: addressDetails?.panNo,
        },
      });

      // Create user
      const user = await tx.user.create({
        data: {
          email: personalDetails.email,
          password: hashedPassword,
          firstName: personalDetails.firstName,
          lastName: personalDetails.lastName,
          companyId: company.id,
        },
      });

      return { company, user };
    });

    sendSuccess(
      res,
      {
        userId: result.user.id,
        companyId: result.company.id,
        message: "Client onboarding successful",
      },
      "Client registered successfully",
      201
    );
  } catch (error) {
    console.error("Client onboarding error:", error);
    sendError(res, "Internal server error", 500);
  }
};
