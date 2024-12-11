import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

export const getTask = async (req: Request, res: Response) => {
	try {
		const tasks = await prisma.task.findMany();
		res.status(200).json(tasks);
	} catch (error) {
		console.error("Error fetching tasks:", error);
		res.status(500).json({ error: "Failed to fetch users" });
	}
};
