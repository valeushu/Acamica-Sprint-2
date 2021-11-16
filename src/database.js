import mongoose from "mongoose";

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then((db) => console.log("db is connected"))
  .catch((error) => console.log(error));

