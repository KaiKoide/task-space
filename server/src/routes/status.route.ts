import express from "express";

import * as statusController from "../controllers/status.controller.js";

export const statusRoute = express();

statusRoute.get("/", statusController.getStatuses);
statusRoute.post("/", statusController.createStatus);
statusRoute.put("/:id", statusController.editStatus);
statusRoute.delete("/:id", statusController.deleteStatus);
