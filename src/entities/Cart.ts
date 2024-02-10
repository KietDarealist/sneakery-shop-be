import mongoose, { Schema, Document, ObjectId } from "mongoose";

// Define Mongoose schema for the User entity
interface ICart extends Document {
  userId: string;
  productId: string;
  quantity: number;
  // Add other fields as needed
}

const cartSchema: Schema = new Schema({
  userId: { type: String, required: true, unique: false },
  productId: { type: String, require: true, unique: true },
  quantity: { type: Number, require: true, unique: true },
});

// Create the User model
export const Cart = mongoose.model<ICart>("Cart", cartSchema);
