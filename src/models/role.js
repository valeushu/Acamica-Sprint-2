import mon from "mongoose";
const { Schema, model } = mon;
export const ROLES = ["user", "admin"];

const roleSchema = new Schema(
  {
    name: String,
  },
  {
    versionKey: false,
  }
);
export default model("Role", roleSchema);
