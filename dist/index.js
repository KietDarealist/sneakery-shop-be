"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv").config();
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const main = async () => {
    const app = express_1.default();
    const mongoUrl = `mongodb+srv://${process.env.DB_USER_NAME_DEV}:${process.env.DB_PASSWORD_DEV}@cluster0.1ojo2c3.mongodb.net/?retryWrites=true&w=majority`;
    try {
        await mongoose_1.default.connect(mongoUrl, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
        });
    }
    catch (error) {
        console.log("MONGODB Connect Eroor", error);
    }
    const PORT = process.env.PORT || 4000;
    app.use(express_1.default.json());
    const userRoute = require("./routes/User");
    const productRoute = require("./routes/Product");
    app.use("/users", userRoute);
    app.use("/products", productRoute);
    app.listen(PORT, () => {
        console.log(`Server started on localhost:${PORT}`);
    });
};
main().catch((error) => console.log("ERROR", error));
//# sourceMappingURL=index.js.map