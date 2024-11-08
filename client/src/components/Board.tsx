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
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

import Column from "./ui/column";

import tasksData from "@/mock/tasksData.json";
import groupData from "@/mock/groupsData.json";
import statusData from "@/mock/statusData.json";
import type { ITask } from "@/types/data";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";

function Board() {
	const [activeColumn, setActiveColumn] = useState(null);

	const tasks: ITask[] = tasksData as ITask[];
	const groupedTasks = tasks.reduce((acc: Record<string, ITask[]>, task) => {
		if (!acc[task.status]) {
			acc[task.status] = [];
		}
		acc[task.status].push(task);
		return acc;
	}, {});

	console.log("statusData", statusData);

	// const columnId = useMemo(
	// 	() =>
	// 		Object.values(groupedTasks).flatMap((tasks) =>
	// 			tasks.map((task) => task.id),
	// 		),
	// 	[groupedTasks],
	// );

	const groups = groupData.reduce((acc: Record<string, string>, group) => {
		acc[group.id] = group.name;
		return acc;
	}, {});

	console.log("groups", groups);

	// console.log("groupedTasks", groupedTasks);

	const orderedStatus = ["todo", "in_progress", "done"];
	const columnId = orderedStatus;

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;

		if (!over || active.id === over.id) {
			console.log("🦈🦈🦈🦈");
			return;
		}
		console.log("Column moved", active.id, "to", over.id);
	}

	function onDragStart(event: DragStartEvent) {
		console.log("DragStartEvent", event);
		// if (event.active.data.current?.type === "Column") {
		// }
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={closestCorners}
			// onDragEnd={handleDragEnd}
			onDragStart={onDragStart}
		>
			<div className="flex justify-evenly gap-4 p-4">
				<SortableContext items={columnId}>
					{statusData.map((status) => (
						<Column
							key={status.id}
							statusData={status}
							groupedTasks={groupedTasks}
							groups={groups}
						/>
					))}
				</SortableContext>
			</div>
		</DndContext>
	);
}

export default Board;
