import { Router } from "express";

import { isAdmin } from "#middlewares";

import { add, edit, remove } from "./controller.js";

const api = Router();

api.post("/", isAdmin, add);
api.put("/:id", isAdmin, edit);
api.delete("/:id", isAdmin, remove);

export default api;
