import { Router } from "express";

import { add, edit, remove } from "./controller.js";

const api = Router();

api.post("/", add);
api.put("/:index", edit);
api.delete("/:index", remove);

export default api;
