import mongoose, { Schema, Document } from "mongoose";

// Define Mongoose schema for the Product entity
interface IProduct extends Document {
  name: string;
  thumbnail: string;
  // Add other fields as needed
}

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
  // Define other fields as needed
});

// Create the User model
export const Product = mongoose.model<IProduct>("Product", productSchema);
