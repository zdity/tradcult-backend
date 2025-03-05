import { Router } from "express";

import auth from "./auth/index.js"
import category from "./category/index.js"
import product from "./product/index.js"

const apis = Router();

apis.use("/auth", auth);
apis.use("/category", category);
apis.use("/product", product);

export default apis;
