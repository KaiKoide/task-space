import cors from "cors";
import "dotenv/config";
import express, { type Request, type Response } from "express";

import { groupsRoute } from "../src/routes/group.route";
import { statusRoute } from "../src/routes/status.route";
import { userRoute } from "../src/routes/user.route";
import { taskRoute } from "../src/routes/task.route";

const app = express();
const port = 3000;

const base_path = "v1";
const api_prefix = "api";

const defaultRoutes = [
	{
		path: `/${base_path}/groups`,
		route: groupsRoute,
	},
	{
		path: `/${base_path}/statuses`,
		route: statusRoute,
	},
	{
		path: `/${base_path}/users`,
		route: userRoute,
	},
	{
		path: `/${base_path}/tasks`,
		route: taskRoute,
	},
];

app.use(express.json());

app.use(
	cors({
		origin: "http://localhost:5173",
		methods: ["GET", "POST", "PUT", "DELETE"],
		allowedHeaders: ["Authorization", "Content-Type"],
	}),
);

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

for (const route of defaultRoutes) {
	console.log(`Route: /${api_prefix}${route.path}`);
	app.use(`/${api_prefix}${route.path}`, route.route);
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
