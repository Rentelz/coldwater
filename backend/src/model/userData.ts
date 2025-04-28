import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  profilePicture: string;
}

const UserSchema: Schema = new Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  profilePicture: { type: String, required: false },
});

export default mongoose.model<IUser>("User", UserSchema);
