import express from "express";
import mongoose from "mongoose";
import multer from "multer";

import { AuthValidation, PostValidation } from "./validations/index.js";
import { UserController, PostController } from "./controllers/index.js";
import { checkAuth, handleValidationErrors } from "./utils/index.js";

mongoose
  .connect(
    "mongodb+srv://sergiohardov:qmAZRuIAjXKQTNjv@cluster0.3ijifyf.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB Ok."))
  .catch((err) => console.log("DB Error.", err));

const app = express();

const storage = multer.diskStorage({
  destination: (_, __, cb) => {
    cb(null, "uploads");
  },
  filename: (_, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.post(
  "/auth/register",
  AuthValidation.register,
  handleValidationErrors,
  UserController.register
);
app.post(
  "/auth/login",
  AuthValidation.login,
  handleValidationErrors,
  UserController.login
);
app.get("/auth/me", checkAuth, UserController.me);

app.get("/posts", PostController.getAll);
app.get("/posts/:id", PostController.getOne);
app.post(
  "/posts",
  checkAuth,
  PostValidation.create,
  handleValidationErrors,
  PostController.create
);
app.delete("/posts/:id", checkAuth, PostController.remove);
app.patch(
  "/posts/:id",
  checkAuth,
  PostValidation.create,
  handleValidationErrors,
  PostController.update
);

app.listen(4444, (err) => {
  if (err) return console.log(err);

  console.log("Server OK.");
});
