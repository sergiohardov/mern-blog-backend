import express from "express";
import mongoose from "mongoose";

mongoose
  .connect(
    "mongodb+srv://sergiohardov:qmAZRuIAjXKQTNjv@cluster0.3ijifyf.mongodb.net/blog?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("DB Ok."))
  .catch((err) => console.log("DB Error.", err));

const app = express();
app.use(express.json());

app.listen(4444, (err) => {
  if (err) return console.log(err);

  console.log("Server OK.");
});
