
import mongoose, { Document, Schema , Model  } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;
