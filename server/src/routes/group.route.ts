import express from "express";

import * as groupsController from "../controllers/group.controller.js";

export const groupsRoute = express();

groupsRoute.get("/", groupsController.getGroups);
groupsRoute.post("/", groupsController.createGroup);
groupsRoute.put("/:id", groupsController.editGroup);
groupsRoute.delete("/:id", groupsController.deleteGroup);
