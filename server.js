import express from "express";

import "./config/env.js";
import "./config/db.js";

import apis from "./src/apis/index.js";

const server = express();

server.use(apis);

server.listen(process.env.PORT);
