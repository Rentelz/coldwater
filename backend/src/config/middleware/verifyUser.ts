// import { Request, Response, NextFunction } from "express";
// import { OAuth2Client } from "google-auth-library";

// const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// export const verifyUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ): Promise<void> => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       console.log("No Authorization header or incorrect format");
//       res.status(401).json({ message: "Unauthorized, no token" });
//       return;
//     }

//     const token = authHeader.split(" ")[1];
//     console.log(
//       "Received token (first few chars):",
//       token.substring(0, 20) + "..."
//     );

//     // Verify Google ID token
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of your app
//     });

//     const payload = ticket.getPayload();
//     console.log("Verified Google token payload:", payload);

//     // You can attach user info to the request if needed
//     (req as any).user = {
//       userId: payload?.sub,
//       email: payload?.email,
//       name: payload?.name,
//     };

//     next();
//   } catch (err) {
//     console.error("Token verification failed", err);
//     res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

import { Request, Response, NextFunction } from "express";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const verifyUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No Authorization header or incorrect format");
      res.status(401).json({ message: "Unauthorized, no token" });
      return;
    }

    const token = authHeader.split(" ")[1];
    console.log(
      "Received token (first few chars):",
      token.substring(0, 20) + "..."
    );

    try {
      // Verify Google ID token
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of your app
      });

      const payload = ticket.getPayload();
      console.log("Verified Google token payload:", payload);

      // You can attach user info to the request if needed
      (req as any).user = {
        userId: payload?.sub,
        email: payload?.email,
        name: payload?.name,
      };

      next();
    } catch (verifyError) {
      console.error("Token verification specifics:", verifyError.message);

      if (verifyError.message.includes("Token used too late")) {
        res.status(401).json({
          message:
            "Token expired - this should automatically refresh on the client side. Please try your request again.",
        });
      } else {
        res.status(401).json({ message: "Invalid token" });
      }
    }
  } catch (err) {
    console.error("Token verification failed:", err);
    res.status(401).json({ message: "Authentication error" });
  }
};
