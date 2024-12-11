import express from "express";

import * as statusController from "../controllers/status.controller.js";

export const statusRoute = express();

statusRoute.get("/", statusController.getStatuses);
