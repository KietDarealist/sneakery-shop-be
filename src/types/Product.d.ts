import express from "express";

type CreateProductPayload = express.Request<
  any,
  any,
  {
    name: string;
    thumbnail: string;
    price: number;
    images?: string[];
    brand?: string;
    size?: number;
  }
>;


