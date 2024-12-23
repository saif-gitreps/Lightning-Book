import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import jwt from "jsonwebtoken";
import { check, validationResult } from "express-validator";
import { verifyToken } from "../middlewares/auth.middleware";
import { me, signUp } from "../controllers/user.controller";

const router = express.Router();

// TODO : Refactor the validation logic into a separate file

router.get("/me", verifyToken, me);

router.post(
   "/sign-up",
   [
      check("firstName", "First name is required").isString(),
      check("lastName", "Last name is required").isString(),
      check("email", "Email is required").isEmail(),
      check("password", "Password is required").isLength({ min: 6 }),
   ],
   signUp
);

export default router;
