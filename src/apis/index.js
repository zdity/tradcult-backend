import { Router, json } from "express";

import { isAuthd } from "#middlewares";

import auth from "./auth/routes.js"
import category from "./category/routes.js"
import product from "./product/routes.js"
import cart from "./cart/routes.js"

const apis = Router();

apis.use(json());

apis.use("/auth", auth);
apis.use("/category", category);
apis.use("/product", product);
apis.use("/cart", isAuthd(true), cart);

export default apis;
