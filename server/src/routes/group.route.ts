import express from "express";

import * as groupsController from "../controllers/group.controller";

export const groupsRoute = express();

groupsRoute.get("/:userId", groupsController.getGroups);
groupsRoute.post("/", groupsController.createGroup);
groupsRoute.put("/:id", groupsController.editGroup);
groupsRoute.delete("/:id", groupsController.deleteGroup);
