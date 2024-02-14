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

  //send sms
  const { Vonage } = require("@vonage/server-sdk");
  // const vonage = new Vonage({
  //   apiKey: "ac337f3d",
  //   apiSecret: "fH3brZLVwmiA8gLt",
  // });
  // const from = "Vonage APIs";
  // const to = "+848437415887";
  // const text = "A text message sent using the Vonage SMS API";

  // async function sendSMS() {
  //   await vonage.sms
  //     .send({ to, from, text })
  //     .then((resp) => {
  //       console.log("Message sent successfully");
  //       console.log(resp);
  //     })
  //     .catch((err) => {
  //       console.log("There was an error sending the messages.");
  //       console.error(err);
  //     });
  // }

  // sendSMS();

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
