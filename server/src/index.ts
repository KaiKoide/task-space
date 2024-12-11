import express, { type Request, type Response } from "express";

import { groupsRoute } from "./routes/group.route.js";
import { statusRoute } from "./routes/status.route.js";

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
];

app.get("/", (req: Request, res: Response) => {
	res.send("Hello World!");
});

for (const route of defaultRoutes) {
	console.log(`Route: /${api_prefix}${route.path}`);
	app.use(`/${api_prefix}${route.path}`, route.route);
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
