import { Router } from "express";

import { add, update, remove } from "./controller.js";

const api = Router();

api.post("/", add);
api.put("/:index", update);
api.delete("/:index", remove);

export default api;
