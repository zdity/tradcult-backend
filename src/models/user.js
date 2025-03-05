import { Schema, model } from "mongoose";

import { hashPassword } from "#utils";

const schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

schema.pre("save", function (next) {
  const { email, password } = this;

  const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w]{2,}$/;
  const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;

  if (!emailRegex.test(email) || !passwordRegex.test(password)) {
    throw new Error();
  };

  const { salt, hash } = hashPassword(password);
  this.password = `${salt}.${hash}`;

  next();
});

const Model = model("User", schema);

export default Model;
