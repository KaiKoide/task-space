import { DndContext } from "@dnd-kit/core";

import { cn } from "@/lib/utils";
import tasksData from "@/mock/tasksData.json";
import groupData from "@/mock/groupsData.json";
import type { ITask } from "@/types/data";
import { Badge } from "./ui/badge";
import SortableCard from "./ui/sortableCard";

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

	const orderedStatus = ["todo", "in_progress", "done"];

	return (
		<DndContext>
			<div className="flex justify-evenly gap-4 p-4">
				{orderedStatus.map((status) => (
					<div key={status}>
						<Badge
							className={cn(
								"capitalize mb-3 text-lg rounded-lg",
								status === "todo" && "bg-violet-300",
								status === "in_progress" && "bg-pink-400",
								status === "done" && "bg-purple-400",
							)}
						>
							{status.replace("_", " ")}
						</Badge>

						{groupedTasks[status].map((task) => (
							<SortableCard
								key={task.id}
								task={task}
								groupName={groups[task.group_id]}
							/>
						))}
					</div>
				))}
			</div>
		</DndContext>
	);
}

export default Board;
