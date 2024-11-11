import {
	closestCorners,
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
	type DragEndEvent,
	type DragOverEvent,
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
import SortableCard from "./ui/sortableCard";

function Board() {
	const [columns, setColumns] = useState<IStatus[]>(statusData);
	const [tasks, setTasks] = useState<ITask[]>(tasksData);
	const [activeColumn, setActiveColumn] = useState<IStatus | null>(null);
	const [activeTask, setActiveTask] = useState<ITask | null>(null);

	// const tasks: ITask[] = tasksData as ITask[];
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
		setActiveColumn(null);
		setActiveTask(null);

		const { active, over } = event;
		if (!over) return;

		console.log("🍢🍢🍢🍢🍢event🍢🍢🍢🍢🍢", event);

		const activeColumnId = active.id;
		const overColumnId = over.id;

		if (activeColumnId === overColumnId) return;

		setColumns((columns) => {
			const activeColumnIndex = columns.findIndex(
				(column) => column.id === activeColumnId,
			);

			const overColumnIndex = columns.findIndex(
				(column) => column.id === overColumnId,
			);

			return arrayMove(columns, activeColumnIndex, overColumnIndex);
		});
	}

	function handleDragStart(event: DragStartEvent) {
		if (event.active.data.current?.type === "Column") {
			setActiveColumn(event.active.data.current.statusData);
			return;
		}

		if (event.active.data.current?.type === "Task") {
			setActiveTask(event.active.data.current.task);
			return;
		}
	}

	function handleDragOver(event: DragOverEvent) {
		const { active, over } = event;
		if (!over) return;

		console.log("🍣🍣🍣🍣event🍣🍣🍣🍣", event);

		const activeId = active.id;
		const overId = over.id;

		console.log("overId", overId);

		if (activeId === overId) return;

		const isActiveTask = active.data.current?.type === "Task";
		const isOverTask = over.data.current?.type === "Task";

		if (!isActiveTask) return;

		if (isActiveTask && isOverTask) {
			// Drop a task over another task
			setTasks((tasks) => {
				const activeIndex = tasks.findIndex((task) => task.id === activeId);
				const overIndex = tasks.findIndex((task) => task.id === overId);

				if (tasks[activeIndex].column_id !== tasks[overIndex].column_id) {
					console.log("🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄🎄");

					tasks[activeIndex].column_id = tasks[overIndex].column_id;
				}

				return arrayMove(tasks, activeIndex, overIndex);
			});
		}

		// Drop a task over a column
		const isOverColumn = over.data.current?.type === "Column";
		const overStatusId = over.data.current?.statusData?.id;
		console.log("overStatusId", overStatusId);

		if (isActiveTask && isOverColumn) {
			setTasks((tasks) => {
				const activeIndex = tasks.findIndex((task) => task.id === activeId);
				const overIndex = tasks.findIndex((task) => task.id === overId);

				// tasks[activeIndex].status_id = tasks[overIndex].status_id;

				return arrayMove(tasks, activeIndex, overIndex);
			});
		}
	}

	console.log("🪼🪼🪼🪼🪼tasks🪼🪼🪼🪼🪼🪼", tasks);

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCorners}
			onDragEnd={handleDragEnd}
			onDragStart={handleDragStart}
			onDragOver={handleDragOver}
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
					{activeTask && (
						<SortableCard
							task={activeTask}
							groupName={groups[activeTask.group_id]}
						/>
					)}
				</DragOverlay>,
				document.body,
			)}
		</DndContext>
	);
}

export default Board;
