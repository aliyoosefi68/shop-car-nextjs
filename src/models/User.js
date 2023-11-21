import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    requierd: true,
  },
  password: {
    type: String,
    requierd: true,
  },
  role: {
    type: String,
    default: "USER",
  },
  name: {
    type: String,
  },
  lastname: {
    type: String,
  },
  phone: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    immutable: true,
  },
});

const User = models.User || model("User", userSchema);

export default User;
