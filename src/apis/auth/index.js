import { Router } from "express";

import controller from "./controller.js";

const api = Router();

api.post("/", controller);

export default api;
