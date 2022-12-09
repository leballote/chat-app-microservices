import { CookieOptions } from "express";

export const appCookieOptions: CookieOptions = {
  maxAge: 1000 * 60 * 60 * 24, //expires in a day
  httpOnly: true, // cookie is only accessible by the server
  // secure: process.env.NODE_ENV === "prod", // only transferred over https
  secure: true,
  sameSite: "none",
};
