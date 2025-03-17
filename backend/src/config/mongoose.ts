import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load .env file

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("MongoDB URI is missing in .env file");
}

export const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "coldwater", // Change to your actual database name
    });
    console.log("✅ MongoDB Connected Successfully");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};
 