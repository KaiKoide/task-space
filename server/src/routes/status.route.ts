import express from "express";

import * as statusController from "../controllers/status.controller";

export const statusRoute = express();

statusRoute.get("/:userId", statusController.getStatuses);
statusRoute.post("/", statusController.createStatus);
statusRoute.put("/:id", statusController.editStatus);
statusRoute.delete("/:id", statusController.deleteStatus);
