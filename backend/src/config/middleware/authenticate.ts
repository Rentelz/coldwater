// import jwt from "jsonwebtoken";
// import { Request, Response, NextFunction } from "express";

// // Extend the Request interface to include the 'user' property
// // declare global {
// //   namespace Express {
// //     interface Request {
// //       user?: any;
// //     }
// //   }
// // }

// const authenticateUser = (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): void | Response => {
//   const authHeader = req.headers.authorization;

//   if (!authHeader || !authHeader.startsWith("Bearer ")) {
//     return res
//       .status(401)
//       .json({ message: "Missing or invalid authorization header" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET as string); // this must match your NextAuth secret
//     req.user = decoded; // Attach the decoded token to the request object
//     next();
//   } catch (error) {
//     return res.status(403).json({ message: "Token verification failed" });
//   }
// };

// export default authenticateUser;

import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authenticateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const authHeader = req.headers.authorization;

  // Check if authorization header is provided
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    // If not, send a response and stop further processing
    res
      .status(401)
      .json({ message: "Missing or invalid authorization header" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verify the token using your secret
    const decoded = jwt.verify(token, process.env.NEXTAUTH_SECRET as string);
    req.user = decoded; // Attach the decoded token to the request object
    // Proceed to the next middleware or route handler
    return next();
  } catch (error) {
    // If token verification fails, send a 403 response and stop further processing
    res.status(403).json({ message: "Token verification failed" });
  }
};

export default authenticateUser;
