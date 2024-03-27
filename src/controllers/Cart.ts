import { ActionResponse, GetListResponse, GetOneResponse } from "../types";
import { IProduct, Product } from "../entities/Product";
import express, { IRoute } from "express";
import { CreateProductPayload } from "../types";

const getProductDetail = async (
  req: express.Request,
  res: GetOneResponse<IProduct>
) => {
  try {
    const { productId } = req.params;
    const findedProduct = await Product.findOne({
      _id: productId,
    });
    if (findedProduct) {
      return res
        ?.status(200)
        .json({ code: 200, results: findedProduct, success: true });
    }
  } catch (error) {
    return res?.status(500)?.json({ code: 500, results: null, success: false });
  }
};

//a create product API to use for admin
const createCart = async (req: CreateProductPayload, res: ActionResponse) => {
  try {
    const headers = req.headers.authorization;
    const { name, category, thumbnail, price, images, brand, size } = req.body;
    const product = new Product({
      name: name,
      category: category.toLowerCase(),
      thumbnail: thumbnail,
      price: price,
      images: images,
      brand: brand?.toLowerCase(),
      size: size,
    });

    await product.save();
    return res
      .status(200)
      .json({ success: true, message: "Create product succces", code: 200 });
  } catch (error) {
    console.log("Internal Create Product Error", error);
    return res.status(200).json({
      success: false,
      message: "Internal Server Error",
      code: 500,
    });
  }
};

export { createCart as createProduct, getProductDetail };
