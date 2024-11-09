import {
	closestCorners,
	DndContext,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
	DragOverEvent,
	type DragStartEvent,
	DragOverlay,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

import Column from "./ui/column";

import tasksData from "@/mock/tasksData.json";
import groupData from "@/mock/groupsData.json";
import statusData from "@/mock/statusData.json";
import type { ITask, IStatus } from "@/types/data";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { createPortal } from "react-dom";

function Board() {
	const [columns, setColumns] = useState<IStatus[]>(statusData);
	const [activeColumn, setActiveColumn] = useState<IStatus | null>(null);

	const tasks: ITask[] = tasksData as ITask[];
	const groupedTasks = tasks.reduce((acc: Record<string, ITask[]>, task) => {
		if (!acc[task.status]) {
			acc[task.status] = [];
		}
		acc[task.status].push(task);
		return acc;
	}, {});

	const groups = groupData.reduce((acc: Record<string, string>, group) => {
		acc[group.id] = group.name;
		return acc;
	}, {});

	const columnsId = useMemo(
		() => columns.map((status) => status.id),
		[columns],
	);

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 3,
			},
		}),
	);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (!over) {
			console.log("🦈🦈🦈🦈");
			return;
		}

		const activeColumnId = active.id;
		const overColumnId = over.id;

		if (activeColumnId === overColumnId) {
			console.log("🐬🐬🐬🐬🐬🐬🐬");
			return;
		}

		console.log("🍣🍣🍣activeColumnId🍣🍣🍣", activeColumnId);

		console.log("Column moved", active.id, "to", over.id);

		setColumns((columns) => {
			const activeColumnIndex = columns.findIndex(
				(column) => column.id === activeColumnId,
			);

			const overColumnIndex = columns.findIndex(
				(column) => column.id === overColumnId,
			);

			console.log(
				"activeColumnIndex",
				activeColumnIndex,
				"overColumnIndex",
				overColumnIndex,
			);

			return arrayMove(columns, activeColumnIndex, overColumnIndex);
		});
	}

	function onDragStart(event: DragStartEvent) {
		console.log("DragStartEvent", event);
		if (event.active.data.current?.type === "Column") {
			setActiveColumn(event.active.data.current.statusData);
			return;
		}
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCorners}
			onDragEnd={handleDragEnd}
			onDragStart={onDragStart}
		>
			<div className="flex justify-evenly gap-4 p-4">
				<SortableContext items={columnsId}>
					{columns.map((status) => (
						<Column
							key={status.id}
							statusData={status}
							groupedTasks={groupedTasks}
							groups={groups}
							isDragging={false}
						/>
					))}
				</SortableContext>
			</div>
			{createPortal(
				<DragOverlay>
					{activeColumn && (
						<Column
							statusData={activeColumn}
							groupedTasks={groupedTasks}
							groups={groups}
							isDragging={true}
						/>
					)}
				</DragOverlay>,
				document.body,
			)}
		</DndContext>
	);
}

export default Board;
