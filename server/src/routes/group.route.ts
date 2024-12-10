import express from "express";

import * as groupsController from "../controllers/group.controller.js";

export const groupsRoute = express();

groupsRoute.get("/", groupsController.getGroups);
