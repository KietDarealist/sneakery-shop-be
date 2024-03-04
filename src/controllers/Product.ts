import { ActionResponse, GetListResponse, GetOneResponse } from "../types";
import { IProduct, Product } from "../entities/Product";
import express, { IRoute } from "express";
import { CreateProductPayload } from "../types";

const getProducts = async (
  req: express.Request,
  res: GetListResponse<IProduct>
) => {
  try {
    const { name, brand, size, category } = req.query;
    const queryConditions: { [key: string]: any } = {};

    if (brand) {
      queryConditions.brand = brand;
    }

    if (name) {
      queryConditions.name = name;
    }

    if (size) {
      queryConditions.size = size;
    }

    if (category) {
      queryConditions.category = category;
    }

    const products = await Product.find(queryConditions);

    return res.json({ success: true, results: products || [], code: 200 });
  } catch (error) {
    console.error(error);
    res.status(500).json({ code: 500, success: false, results: [] });
  }
};

const getProductDetail = async (
  req: express.Request,
  res: GetOneResponse<IProduct>
) => {
  try {
    const { productId } = req.params;

    console.log("get product details", productId);
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
const createProduct = async (
  req: CreateProductPayload,
  res: ActionResponse
) => {
  try {
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

export { getProducts, createProduct, getProductDetail };
