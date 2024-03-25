import {
  CreateUserRequest,
  EditUserRequest,
  LoginUserRequest,
  VerifyUserOTPRequest,
} from "../types/User";
import { IUser, User } from "../entities/User";
import express from "express";
import argon2 from "argon2";
import { generateOTP, sendOTPThroughMail } from "../utils";
import { OTP } from "../entities/OTP";
import { ActionResponse, GetListResponse } from "../types/Response";
import jsonwebToken, { JsonWebTokenError } from "jsonwebtoken";

const getUsers = async (req: express.Request, res: GetListResponse<IUser>) => {
  try {
    const users = await User.find();
    const { params } = req;
    const totalRecords = await User.countDocuments();
    res.status(200).json({
      results: users,
      totalRecords: totalRecords,
      success: true,
      code: 200,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, totalRecords: 0, results: [], code: 500 });
  }
};

//basic flow register user
const registerUser = async (req: CreateUserRequest, res: ActionResponse) => {
  try {
    const { phoneNumber, username, password, email } = req.body;
    //Validate field
    if (!password || !email || !username) {
      return res.status(400).json({
        success: false,
        code: 400,
        message: "Missing one or more field",
      });
    }
    const filteredUsers = await User.findOne({
      email: email,
    });
    if (!!filteredUsers) {
      return res.status(400).json({
        success: false,
        message: "Email is alrealdy in use",
        code: 400,
      });
    } else {
      //Create a user with isVerifed field is false
      const encryptedPassword = await argon2.hash(password);
      const newUser = new User({
        username: username,
        email: email,
        phoneNumber: phoneNumber,
        password: encryptedPassword,
        isVerified: false,
      });
      await newUser.save();
      const generatedOTP = generateOTP();

      const otp = new OTP({
        otp: generatedOTP,
        userId: newUser?.id,
      });
      await otp.save();
      sendOTPThroughMail(
        email,
        "Please verify your OTP",
        `Your OTP is ${generatedOTP}`
      );
      return res.status(200).json({
        success: true,
        message: {
          text: "Register user successfully",
          verifyID: newUser?.id,
        },
        code: 200,
      });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error", code: 500 });
  }
};

//basic flow login user
const loginUser = async (req: LoginUserRequest, res: ActionResponse) => {
  try {
    const { email, password } = req.body;
    const existedUser = await User.findOne({
      email: email,
    });

    if (!!existedUser) {
      const isValidPassword = await argon2.verify(
        existedUser.password,
        password
      );
      if (isValidPassword) {