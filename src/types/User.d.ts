import express from "express";

type CreateUserRequest = express.Request<
  any,
  any,
  { username: string; email: string; password: string; phoneNumber?: string }
>;

type LoginUserRequest = express.Request<
  any,
  any,
  { email: string; password: string }
>;

type VerifyUserOTPRequest = express.Request<any, any, { code: string }>;
