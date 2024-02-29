import { ActionResponse, GetListResponse } from "../types";
import { IProduct, Product } from "../entities/Product";
import express from "express";
import { CreateProductPayload } from "../types";

const getProducts = async (
  req: express.Request,
  res: GetListResponse<IProduct>
) => {
  try {
    const products = await Product.find();
    return res.json({ success: true, results: products || [], code: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, success: false, results: [] });
  }
};

const createProduct = async (
  req: CreateProductPayload,
  res: ActionResponse
) => {
  try {
    
  } catch (error) {}
};

export { getProducts };
