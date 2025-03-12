import { Router } from "express";

import { isAuthd } from "#middlewares";

import auth from "./auth/index.js"
import category from "./category/index.js"
import product from "./product/index.js"
import cart from "./cart/index.js"

const apis = Router();

apis.use("/auth", auth);
apis.use("/category", category);
apis.use("/product", product);
apis.use("/cart", isAuthd(true), cart);

export default apis;
