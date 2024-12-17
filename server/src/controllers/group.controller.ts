import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getGroups = async (req: Request, res: Response) => {
	try {
		const groups = await prisma.group.findMany();

		res.status(200).json(groups);
	} catch (error) {
		console.error("Error fetching groups", error);

		res.status(500).json({
			error: "Failed fetching groups",
			details: error instanceof Error ? error.message : "Unknown error",
		});
	}
};

export const createGroup = async (req: Request, res: Response) => {
	const { id, name, createdAt } = req.body;
	try {
		const newGroup = await prisma.group.create({
			data: {
				id,
				name,
				createdAt,
			},
		});

		res.status(201).json(newGroup);
	} catch (error) {
		console.error("Error creating group", error);

		res.status(500).json({
			error: "Failed creating group",
			details: error instanceof Error ? error.message : "Unknown error",
		});
	}
};

export const editGroup = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { name } = req.body;

	try {
		const editedGroup = await prisma.group.update({
			where: { id },
			data: { name },
		});

		res.status(201).json(editedGroup);
	} catch (error) {
		console.error("Error editing group", error);

		res.status(500).json({
			error: "Failed editing group",
			message: error instanceof Error ? error.message : "Unknown error",
		});
	}
};

export const deleteGroup = async (req: Request, res: Response) => {
	const { id } = req.params;
	try {
		const deletedGroup = await prisma.group.delete({
			where: {
				id,
			},
		});

		res.status(200).json(deletedGroup);
	} catch (error) {
		console.error("Error deleting group", error);

		res.status(500).json({
			error: "Failed to delete group",
			details: error instanceof Error ? error.message : "Unknown error",
		});
	}
};
