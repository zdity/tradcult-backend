import { Schema, model } from "mongoose";
import { timingSafeEqual } from "crypto";

import { hashPassword } from "#utils";

const schema = new Schema({
  email: { type: String },
  phone: { type: String },
  password: { type: String, required: true },
  role: { type: String },
  cart: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    quantity: { type: Number, default: 1 }
  }],
  addresses: [{
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true }
  }],
  orders: [{
    type: Schema.Types.ObjectId,
    ref: "Order",
    required: true
  }]
});

schema.pre("save", function (next) {
  if (this.isModified("password")) {
    const { salt, hash } = hashPassword(this.password);
    this.password = `${salt}.${hash}`;
  };

  next();
});

schema.method("verifyPassword", function (password) {
  const [savedSalt, savedHash] = this.password.split(".");
  const { hash: attemptHash } = hashPassword(password, savedSalt);

  return timingSafeEqual(
    Buffer.from(attemptHash),
    Buffer.from(savedHash)
  );
});

const Model = model("User", schema);

export default Model;
