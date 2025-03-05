import express, { json } from "express";

import "#config/env.js";
import "#config/db.js";

import apis from "./apis/index.js";

const app = express();

app.use(json());

app.use(apis);

app.listen(8000);
