import express from "express";

import * as userController from "../controllers/user.controller";

export const userRoute = express();

userRoute.get("/", userController.getUsers);
