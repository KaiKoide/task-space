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
import { Plus } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";
import Column from "@/components/ui/column";
import NameDialog from "@/components/ui/nameDialog";
import SortableCard from "@/components/ui/sortableCard";

import { useTaskStore, useGroupStore, useStatusStore } from "@/store/useStore";
import type { ITask, IStatus } from "@/types/data";

function Board() {
	const { statuses, setStatus, fetchStatus } = useStatusStore();
	const { tasks, setTasks, fetchTasks } = useTaskStore();
	const { groups, fetchGroups } = useGroupStore();
	const [activeColumn, setActiveColumn] = useState<IStatus | null>(null);
	const [activeTask, setActiveTask] = useState<ITask | null>(null);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		fetchTasks();
		fetchStatus();
		fetchGroups();
	}, []);

	const groupedTasks = tasks.reduce((acc: Record<string, ITask[]>, task) => {
		if (!acc[task.statusId]) {
			acc[task.statusId] = [];
		}
		acc[task.statusId].push(task);
		return acc;
	}, {});

	console.log("groupedTasks", groupedTasks);

	const groupsObj = groups.reduce((acc: Record<string, string>, group) => {
		acc[group.id] = group.name;
		return acc;
	}, {});

	const columnsId = useMemo(
		() => statuses.map((status) => status.id),
		[statuses],
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

		const activeColumnId = active.id;
		const overColumnId = over.id;

		if (activeColumnId === overColumnId) return;

		setStatus((statuses) => {
			const activeColumnIndex = statuses.findIndex(
				(column) => column.id === activeColumnId,
			);

			const overColumnIndex = statuses.findIndex(
				(column) => column.id === overColumnId,
			);

			return arrayMove(statuses, activeColumnIndex, overColumnIndex);
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

		const activeId = active.id;
		const overId = over.id;

		if (activeId === overId) return;

		const isActiveTask = active.data.current?.type === "Task";
		const isOverTask = over.data.current?.type === "Task";

		if (!isActiveTask) return;

		if (isActiveTask && isOverTask) {
			// Drop a task over another task
			setTasks((tasks) => {
				const activeIndex = tasks.findIndex((task) => task.id === activeId);
				if (activeIndex === -1) return tasks;
				const overIndex = tasks.findIndex((task) => task.id === overId);

				const updatedTasks = [...tasks];
				updatedTasks[activeIndex] = {
					...updatedTasks[activeIndex],
					statusId: tasks[overIndex].statusId,
				};

				return arrayMove(updatedTasks, activeIndex, overIndex);
			});
		}

		// Drop a task over a column
		const isOverColumn = over.data.current?.type === "Column";

		if (isActiveTask && isOverColumn) {
			setTasks((tasks) => {
				const activeIndex = tasks.findIndex((task) => task.id === activeId);
				if (activeIndex === -1) return tasks;

				const updatedTasks = [...tasks];
				updatedTasks[activeIndex] = {
					...updatedTasks[activeIndex],
					statusId: over.data.current?.statusData.id,
				};

				return arrayMove(updatedTasks, activeIndex, activeIndex);
			});
		}
	}

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
					{statuses.map((status) => (
						<Column
							key={status.id}
							statusData={status}
							groupedTasks={groupedTasks}
							groups={groupsObj}
							isDragging={false}
						/>
					))}
				</SortableContext>
				<Button
					onClick={() => setOpen(true)}
					variant="outline"
					className="rounded-md"
				>
					<Plus />
					New Statue
				</Button>
				<NameDialog open={open} setOpen={setOpen} type={"status"} />
			</div>
			{createPortal(
				<DragOverlay>
					{activeColumn && (
						<Column
							statusData={activeColumn}
							groupedTasks={groupedTasks}
							groups={groupsObj}
							isDragging={true}
						/>
					)}
					{activeTask && (
						<SortableCard
							task={activeTask}
							groupName={
								activeTask.groupId ? groupsObj[activeTask.groupId] : "No Group"
							}
						/>
					)}
				</DragOverlay>,
				document.body,
			)}
		</DndContext>
	);
}

export default Board;
