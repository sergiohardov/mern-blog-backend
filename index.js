import express from "express";
import mongoose from "mongoose";
import { registerValidation, loginValidation } from "./validations/auth.js ";
import checkAuth from "./utils/checkAuth.js";
import * as UserController from "./controllers/User.js";

mongoose
  .connect(
    "mongodb+srv://sergiohardov:qmAZRuIAjXKQTNjv@cluster0.3ijifyf.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB Ok."))
  .catch((err) => console.log("DB Error.", err));

const app = express();
app.use(express.json());

app.post("/auth/register", registerValidation, UserController.register);
app.post("/auth/login", loginValidation, UserController.login);
app.get("/auth/me", checkAuth, UserController.me);

app.listen(4444, (err) => {
  if (err) return console.log(err);

  console.log("Server OK.");
});
