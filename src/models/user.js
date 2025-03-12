import { Schema, model } from "mongoose";

import { hashPassword } from "#utils";

const schema = new Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String
  },
  cart: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    quantity: {
      type: Number,
      default: 1
    }
  }]
});

schema.pre("save", function (next) {
  if (this.isModified("password")) {
    const { salt, hash } = hashPassword(this.password);
    this.password = `${salt}.${hash}`;
  };

  next();
});

const Model = model("User", schema);

export default Model;
