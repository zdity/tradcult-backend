import { Schema, model } from "mongoose";

const schema = new Schema({
  name: {
    type: String,
    required: true
  }
});

const Model = model("Category", schema);

export default Model;
