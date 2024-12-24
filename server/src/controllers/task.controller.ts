import { PrismaClient } from "@prisma/client";
import type { Request, Response } from "express";

const prisma = new PrismaClient();

export const getTask = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;

		const tasks = await prisma.task.findMany({
			where: {
				createdBy: userId,
			},
		});
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

export const editTask = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const updatedData = req.body;

		const updatedTask = await prisma.task.update({
			where: { id },
			data: updatedData,
		});

		res.status(200).json(updatedTask);
	} catch (error) {
		console.error("Error editing task", error);

		res.status(500).json({
			error: "Failed editing task",
			message: error instanceof Error ? error.message : "Unknown error",
		});
	}
};

export const deleteTask = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;

		const response = await prisma.task.delete({
			where: { id },
		});

		res.status(200).json(response);
	} catch (error) {
		console.error("Error deleting the task", error);

		res.status(500).json({
			error: "Failed to delete the task",
			details: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
