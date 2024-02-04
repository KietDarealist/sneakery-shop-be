"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = require("./entities/User");
const Product_1 = require("./entities/Product");
const main = async () => {
    const app = express_1.default();
    const mongoUrl = `mongodb+srv://tuankiet270802:63WYUuJ00inc2DSP@cluster0.1ojo2c3.mongodb.net/?retryWrites=true&w=majority`;
    await mongoose_1.default.connect(mongoUrl, {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
    const PORT = process.env.PORT || 4000;
    const newUser = new User_1.User({
        username: "exampleUsername2",
        email: "example@email.com3",
    });
    const newProduct = new Product_1.Product({
        name: "Product 1",
        thumbnail: "Product 1 thumbnail",
    });
    await newUser.save();
    await newProduct.save();
    app.listen(PORT, () => {
        console.log(`Server started on localhost:${PORT}`);
    });
};
main().catch((error) => console.log("ERROR", error));
//# sourceMappingURL=index.js.map