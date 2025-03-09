import { Schema, model } from "mongoose";

import { hashPassword } from "#utils";

const schema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

schema.pre("save", function (next) {
  const { salt, hash } = hashPassword(this.password);
  this.password = `${salt}.${hash}`;

  next();
});

const Model = model("User", schema);

export default Model;
