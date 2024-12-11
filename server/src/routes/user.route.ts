import express from "express";

import * as userController from "../controllers/user.controller.js";

export const userRoute = express();

userRoute.get("/", userController.getUsers);
