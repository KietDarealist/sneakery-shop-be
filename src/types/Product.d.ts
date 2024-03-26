import express from "express";

type CreateProductPayload = express.Request<
  any,
  any,
  {
    name: string;
    category: string;
    thumbnail: string;
    price: number;
    description?: string;
    images?: string[];
    brand?: string;
    size?: number[];
  }
>;
