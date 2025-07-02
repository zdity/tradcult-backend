import { Router } from "express";

import { create, cancel } from "./controller.js";

const api = Router();

api.post("/", create);
api.delete("/:id", cancel);

export default api;
