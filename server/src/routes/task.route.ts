import express from "express";

import * as taskController from "../controllers/task.controller.js";

export const taskRoute = express();

taskRoute.get("/", taskController.getTask);
taskRoute.post("/", taskController.createTask);
