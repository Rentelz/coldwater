import { Request, Response } from "express";
import User, { IUser } from "../../model/profile/registerUser";

export const updateProfileOne = async (req: Request, res: Response) => {
  try {
    const user = (req as any).user; // from verifyUser middleware
    const userEmail = user.email; // Assuming user object has an email property

    // Find the user by email
    const userExists = (await User.findOne({ email: userEmail })) as IUser;
    if (!userExists) {
      console.log("User not found in database");
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user profile with the additional data (add new fields to profile)
    userExists.profile = {
      ...userExists.profile, // Preserve existing profile data
      number: req.body.number,
      city: req.body.city,
      state: req.body.state,
      address: req.body.address,
      pincode: req.body.pincode,
      addressType: req.body.addressType,
    };

    // Save the updated user document
    await userExists.save();

    // Respond with success
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Profile update error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
