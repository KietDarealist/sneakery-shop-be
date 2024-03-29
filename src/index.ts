require("dotenv").config();
import "reflect-metadata";
import express, { text } from "express";
import mongoose from "mongoose";

const main = async () => {
  const app = express();
  //Session, cookies store
  const mongoUrl = `mongodb+srv://${process.env.DB_USER_NAME_DEV}:${process.env.DB_PASSWORD_DEV}@cluster0.1ojo2c3.mongodb.net/?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(mongoUrl, {
      useCreateIndex: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  } catch (error) {
    console.log("MONGODB Connect Eroor", error);
  }

  //PORT
  const PORT = process.env.PORT || 4000;
  app.use(express.json());

  //list of routes
  const userRoute = require("./routes/User");
  const productRoute = require("./routes/Product");
  app.use("/users", userRoute);
  app.use("/products", productRoute);

  //listen on port
  app.listen(PORT, () => {
    console.log(`Server started on localhost:${PORT}`);
  });
};

main().catch((error) => console.log("ERROR", error));
