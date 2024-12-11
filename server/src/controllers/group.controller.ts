import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getGroups = async (req: Request, res: Response) => {
	try {
		const groups = await prisma.group.findMany();
		res.status(200).json(groups);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch groups" });
	}
};
