import { Request, Response } from "express";
import User from "../../model/profile/registerUser";

export const updateProfileOne = async (req: Request, res: Response) => {
  try {
    console.log("Received request body:", req.body);

    const user = (req as any).user; // from verifyUser middleware
    const userEmail = user.email; // Assuming user object has an email property

    // Find and update the user by email
    const userExists = await User.findOneAndUpdate(
      { email: userEmail },
      {
        $set: {
          "profile.number": req.body.number,
          "profile.city": req.body.city,
          "profile.state": req.body.state,
          "profile.address": req.body.address,
          "profile.pincode": req.body.pincode,
          "profile.addressType": req.body.addressType,
        },
      },
      { new: true } // Return the updated user
    );

    if (!userExists) {
      console.log("User not found in database");
      return res.status(404).json({ message: "User not found" });
    }

    console.log("Updated user profile:", userExists.profile);

    // Respond with success
    res
      .status(200)
      .json({ message: "Profile updated successfully", user: userExists });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
