import { Router } from "express";

import { isAdmin } from "#middlewares";

import {
  create,
  update,
  remove
} from "./controller.js";

const api = Router();

api.post("/", isAdmin, create);
api.put("/:id", isAdmin, update);
api.delete("/:id", isAdmin, remove);

export default api;
