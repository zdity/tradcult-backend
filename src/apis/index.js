import { Router, json } from "express";

import { isAuth } from "#middlewares";

import auth from "./auth/routes.js"
import category from "./category/routes.js"
import product from "./product/routes.js"
import cart from "./cart/routes.js"
import order from "./order/routes.js"

const apis = Router();

apis.use(json());

apis.use("/auth", auth);
apis.use("/category", category);
apis.use("/product", product);
apis.use("/cart", isAuth(), cart);
apis.use("/order", isAuth(), order);

export default apis;
