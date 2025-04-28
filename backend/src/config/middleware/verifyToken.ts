import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}

const verifyToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];
  try {
    // const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET as string);
    jwt.verify(token, process.env.NEXTAUTH_SECRET as string, {
      algorithms: ["HS256"],
    });
    const decoded = jwt.decode(token) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default verifyToken;
