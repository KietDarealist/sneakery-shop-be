import express from "express";

type CreateUserRequest = express.Request<
  any,
  any,
  { username: string; phoneNumber: string; password: string }
>;

type LoginUserRequest = express.Request<
  any,
  any,
  { phoneNumber: string; password: string }
>;
