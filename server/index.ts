import cors from "cors";
import express, { type Request, type Response } from "express";

import { groupsRoute } from "./src/routes/group.route";
import { statusRoute } from "./src/routes/status.route";
import { taskRoute } from "./src/routes/task.route";

const app = express();
const port = process.env.PORT || 3000;

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
		path: `/${base_path}/tasks`,
		route: taskRoute,
	},
];

// Use the environment variable offered by Vercel for URL
const frontendUrl = process.env.VERCEL_URL
	? `https://${process.env.VERCEL_URL}`
	: "http://localhost:5173";

app.use(express.json());

app.use(
	cors({
		origin: frontendUrl || "*",
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
