import mongoose, { Schema, Document } from "mongoose";

// Define Mongoose schema for the User entity
interface IUser extends Document {
  username: string;
  email: string;
  // Add other fields as needed
}

const userSchema: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Define other fields as needed
});

// Create the User model
export const User = mongoose.model<IUser>("User", userSchema);
