require("dotenv").config();
import "reflect-metadata";
import express from "express";
import mongoose from "mongoose";
import { User } from "./entities/User";
import { Product } from "./entities/Product";

const main = async () => {
  const app = express();
  //Session, cookies store
  const mongoUrl = `mongodb+srv://tuankiet270802:63WYUuJ00inc2DSP@cluster0.1ojo2c3.mongodb.net/?retryWrites=true&w=majority`;

  await mongoose.connect(mongoUrl, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  const PORT = process.env.PORT || 4000;

  const newUser = new User({
    username: "exampleUsername2",
    email: "example@email.com3",
    // Set other fields accordingly
  });

  const newProduct = new Product({
    name: "Product 1",
    thumbnail: "Product 1 thumbnail",
  });

  await newUser.save(); // Save the new user to the database
  await newProduct.save();

  app.listen(PORT, () => {
    console.log(`Server started on localhost:${PORT}`);
  });
};

main().catch((error) => console.log("ERROR", error));
