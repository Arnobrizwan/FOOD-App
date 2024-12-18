import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

// Extend the Express Request interface to include "id"
declare global {
  namespace Express {
    interface Request {
      id?: string; // Use optional type to prevent conflicts
    }
  }
}

export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Extract the token from cookies
    const token = req.cookies?.token;

    if (!token) {
      res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
      return;
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.SECRET_KEY!) as jwt.JwtPayload;

    // Check if decoding was successful
    if (!decoded || !decoded.userId) {
      res.status(401).json({
        success: false,
        message: "Invalid token",
      });
      return;
    }

    // Attach the decoded userId to the request object
    req.id = decoded.userId;

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error in isAuthenticated middleware:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
