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

export const createTask = async (req: Request, res: Response) => {
	try {
		const {
			id,
			title,
			description,
			dueDate,
			groupId,
			createdAt,
			statusId,
			createdBy,
		} = req.body;

		const newTask = await prisma.task.create({
			data: {
				id,
				title,
				description,
				dueDate,
				groupId,
				createdAt,
				statusId,
				createdBy,
			},
		});

		res.status(200).json(newTask);
	} catch (error) {
		console.error("Error creating task", error);
		res.status(500).json({
			error: "Failed creating task",

			details: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
