import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getStatuses = async (req: Request, res: Response) => {
	try {
		const { userId } = req.params;

		const statuses = await prisma.status.findMany({
			where: {
				OR: [{ createdBy: userId }, { createdBy: null }],
			},
		});
		res.status(200).json(statuses);
	} catch (error) {
		res.status(500).json({ error: "Failed to fetch statuses" });
	}
};

export const createStatus = async (req: Request, res: Response) => {
	const { id, status, createdBy } = req.body;
	try {
		const newStatus = await prisma.status.create({
			data: {
				id,
				status,
				createdBy,
			},
		});

		res.status(201).json(newStatus);
	} catch (error) {
		console.error("Error creating status", error);
		res.status(500).json({
			error: "Failed creating status",

			details: error instanceof Error ? error.message : "Unknown error",
		});
	}
};

export const editStatus = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { status } = req.body;

	try {
		const editedStatus = await prisma.status.update({
			where: { id },
			data: { status },
		});

		res.status(201).json(editedStatus);
	} catch (error) {
		console.error("Error editing status", error);

		res.status(500).json({
			error: "Failed editing status",
			message: error instanceof Error ? error.message : "Unknown error",
		});
	}
};

export const deleteStatus = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const deletedStatus = await prisma.status.delete({
			where: {
				id,
			},
		});

		res.status(200).json(deletedStatus);
	} catch (error) {
		console.error("Error deleting status", error);

		res.status(500).json({
			error: "Failed to delete status",
			details: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
