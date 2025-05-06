import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";

const JWT_SECRET =
  process.env.JWT_SECRET || "K9b!7zP@Wm3$XqG^rT2@$*ùUfJ6vN0%Lp8*ZsDqY1AeHt";

interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

// Sign a token for a given payload (typically user ID or data)
export const signToken = (payload: object, expiresIn = 1): string => {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, JWT_SECRET, options);
};

// Middleware to authenticate token and attach user to request
export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authorization token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded as JwtPayload; // narrow the type
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}