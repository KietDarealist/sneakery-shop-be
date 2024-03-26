import mongoose, { Schema, Document } from "mongoose";

// Define Mongoose schema for the Product entity
export interface IProduct extends Document {
  name: string;
  category: string;
  thumbnail: string;
  price: number;
  description?: string;
  images?: string[];
  brand?: string;
  size?: number[];
  // Add other fields as needed
}

const productSchema: Schema = new Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, require: false },
  images: { type: [String], required: false },
  brand: { type: String, require: false },
  size: { type: [Number], require: false },

  // Define other fields as needed
});

// Create the User model
export const Product = mongoose.model<IProduct>("Product", productSchema);
