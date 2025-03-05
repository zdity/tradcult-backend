import { Router } from "express";

import auth from "./auth/index.js"

const apis = Router();

apis.use("/auth", auth);

export default apis;
