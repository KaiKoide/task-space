import express from "express";

import * as taskController from "../controllers/task.controller";

export const taskRoute = express();

taskRoute.get("/", taskController.getTask);
taskRoute.post("/", taskController.createTask);
taskRoute.put("/:id", taskController.editTask);
taskRoute.delete("/:id", taskController.deleteTask);
