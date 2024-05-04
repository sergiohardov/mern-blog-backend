import { body } from "express-validator";

export const create = [
  body("title", "Title must not be empty. Min length 3 symbols.")
    .isLength({ min: 3 })
    .isString(),
  body("text", "Post text must not be empty. Min length 10 symbols.")
    .isLength({ min: 10 })
    .isString(),
  body("tags", "Invalid format tags.").optional().isString(),
  body("imageUrl", "Invalid url format.").optional().isString(),
];
