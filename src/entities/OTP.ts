import mongoose, { Schema, Document,  } from "mongoose";

// Define Mongoose schema for the User entity
interface IOTP extends Document {
  username: string;
  phoneNumber: string;
  password: string;
  // Add other fields as needed
}

const otpSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: true },
  otp: { type: String, require: true, unique: true },
});

// Create the User model
export const OTP = mongoose.model<IOTP>("OTP", otpSchema);
