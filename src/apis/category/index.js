import { Router } from "express";

import {
  create,
  update,
  remove
} from "./controller.js";

const api = Router();

api.post("/", create);
api.put("/:id", update);
api.delete("/:id", remove);

export default api;
