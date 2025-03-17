import { Request, Response } from "express";
import User from "../../model/registerUser";

export const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, name } = req.body;

    if (!email || !name) {
      res.status(400).json({ error: "Email and name are required" });
      return; // ✅ Explicitly end function
    }

    let user = await User.findOne({ email });

    if (user) {
      res.status(200).json({ message: "User already exists", user });
      return;
    }

    user = new User({ email, name });
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ error: "Server error" });
  }
};
