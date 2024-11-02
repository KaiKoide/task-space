import {
	closestCorners,
	DndContext,
	KeyboardSensor,
	PointerSensor,
	useSensor,
	useSensors,
} from "@dnd-kit/core";

import Column from "./ui/column";

import tasksData from "@/mock/tasksData.json";
import groupData from "@/mock/groupsData.json";
import type { ITask } from "@/types/data";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";

function Board() {
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

	console.log("groupedTasks", groupedTasks);

	const orderedStatus = ["todo", "in_progress", "done"];

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		}),
	);

	return (
		<DndContext sensors={sensors} collisionDetection={closestCorners}>
			<div className="flex justify-evenly gap-4 p-4">
				{orderedStatus.map((status) => (
					<Column
						key={status}
						status={status}
						groupedTasks={groupedTasks}
						groups={groups}
					/>
				))}
			</div>
		</DndContext>
	);
}

export default Board;
