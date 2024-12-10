import express, { type Request, type Response } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const port = 3000;
const prisma = new PrismaClient();

// app.get("/", (req: Request, res: Response) => {
// 	res.send("Hello World!");
// });

app.get("/", async (req: Request, res: Response) => {
	try {
		const groups = await prisma.group.findMany();
		res.status(200).json(groups);
		res.send(groups);
	} catch (error) {
		console.error("Error fetching groups:", error);
		res.status(500).json({ error: "Failed to fetch groups" });
	}
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
