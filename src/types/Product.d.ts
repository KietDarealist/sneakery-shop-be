import express from "express";

type CreateProductPayload = express.Request<
  any,
  any,
  { name: string; thumbnail: string }
>;
