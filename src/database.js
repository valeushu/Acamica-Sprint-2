import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost/delilahdb")
  .then((db) => console.log("db is connected"))
  .catch((error) => console.log(error));
