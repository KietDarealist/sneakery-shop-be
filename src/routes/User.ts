import express from "express";
import { getUsers, loginUser, registerUser } from "../controllers/User";
const router = express.Router();

// define the about route
router.get("/", getUsers);
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
