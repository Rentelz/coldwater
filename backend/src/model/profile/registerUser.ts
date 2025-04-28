// import mongoose, { Document, Schema, Model } from "mongoose";

// export interface IUser extends Document {
//   profile: any;
//   name: string;
//   email: string;
// }

// const UserSchema: Schema = new Schema(
//   {
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     image: { type: String },
//     createdAt: { type: Date, default: Date.now },
//   },
//   { timestamps: true }
// );

// const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
// export default User;

import mongoose, { Document, Schema, Model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  image?: string;
  profile?: {
    number?: string;
    city?: { id: number; name: string };
    state?: { id: number; name: string };
    address?: string;
    pincode?: string;
    addressType?: string;
  };
  createdAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
    profile: {
      number: { type: String },
      city: {
        id: { type: Number },
        name: { type: String },
      },
      state: {
        id: { type: Number },
        name: { type: String },
      },
      address: { type: String },
      pincode: { type: String },
      addressType: { type: String },
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;
