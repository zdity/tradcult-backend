import { Router } from "express";

import { add, update, remove } from "./controller.js";

const api = Router();

api.post("/", add);
api.patch("/:id", update);
api.delete("/:id", remove);

export default api;
