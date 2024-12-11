import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getStatuses = async (req: Request, res: Response) => {
	try {
		const statuses = await prisma.status.findMany();
		res.status(200).json(statuses);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch statuses" });
	}
};
