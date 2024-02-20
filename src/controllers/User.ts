import { CreateUserRequest, LoginUserRequest } from "../types/User";
import { User } from "../entities/User";
import express from "express";
import argon2 from "argon2";
import { sendOTPThroughMail } from "../utils";
import { OTP } from "src/entities/OTP";

const getUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await User.find();
    const { params } = req;
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//basic flow register user
const registerUser = async (
  req: CreateUserRequest,
  res: express.Response
) => {};

//basic flow login user
const loginUser = async (req: LoginUserRequest, res: express.Response) => {
  try {
    const { phoneNumber, password } = req.body;
    const existedUser = await User.findOne({
      phoneNumber: phoneNumber,
    });

    if (!!existedUser) {
      const isValidPassword = await argon2.verify(
        existedUser.password,
        password
      );
      if (isValidPassword) {
        res.status(200).json("Login successfully");
      } else {
        res?.status(400).json("Phone number or password is incorrect");
      }
    } else {
      res?.status(400).json("Phone number or password is incorrect");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export { getUsers, registerUser, loginUser };
