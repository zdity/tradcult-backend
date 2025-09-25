import { Schema, model } from "mongoose";

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  items: [{
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true
    },
    snapshot: {
      name: { type: String, required: true },
      description: { type: String },
      price: { type: Number, required: true }
    },
    quantity: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  address: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  payment: {
    method: {
      type: String,
      enum: ["online", "offline"],
      required: true
    },
    status: {
      type: String,
      enum: ["unpaid", "paid", "failed", "refunded"],
      required: true
    }
  },
  status: {
    type: String,
    enum: ["pending", "shipped", "delivered", "updated", "canceled"],
    default: "pending"
  },
  created: { type: Date, default: Date.now },
  shipped: { type: Date },
  delivered: { type: Date },
  updated: { type: Date },
  canceled: { type: Date }
});

const Model = model("Order", schema);

export default Model;
