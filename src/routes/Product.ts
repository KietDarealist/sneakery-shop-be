import express from "express";
import { createProduct, getProducts } from "../controllers/Product";
import { validateFieldPayload } from "../middlewares";
const router = express.Router();

// define the about route
router.get("/", getProducts);
router.post("/create", createProduct);

module.exports = router;
