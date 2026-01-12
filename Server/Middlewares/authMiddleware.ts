import { Request, Response, NextFunction } from "express";
import { auth } from "../lib/auth.js";
import { fromNodeHeaders } from "better-auth/node";
import { success } from "better-auth";

export const protect = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session || !session.user) {
      return res.status(401).json({
        message: "Unathorized User",
      });
    }

    req.userId = session.user.id;
    next();
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: error.code || error.message,
    });
  }
};
