import { body } from "express-validator";

export const registerValidation = [
  body("email", "Not valid format email.").isEmail(),
  body("password", "Password length must be min 5 symbols.").isLength({
    min: 5,
  }),
  body("fullName", "Set your name.").isLength({ min: 3 }),
  body("avatarUrl", "Not valid url for avatar.").optional().isURL(),
];
