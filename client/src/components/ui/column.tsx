import { useDroppable } from "@dnd-kit/core";
import { SortableContext, rectSortingStrategy } from "@dnd-kit/sortable";

import SortableCard from "./sortableCard";

import { Badge } from "./badge";
import { cn } from "@/lib/utils";
import type { ITask } from "@/types/data";

interface ColumnProps {
	status: string;
	groupedTasks: Record<string, ITask[]>;
	groups: Record<string, string>;
}

function Column({ status, groupedTasks, groups }: ColumnProps) {
	const { setNodeRef } = useDroppable({ id: status });

	return (
		<SortableContext
			id={status}
			items={groupedTasks[status].map((task) => task.id)}
			strategy={rectSortingStrategy}
		>
			<div ref={setNodeRef}>
				<Badge
					className={cn(
						"capitalize mb-3 text-lg rounded-lg",
						status === "todo" && "bg-fuchsia-100",
						status === "in_progress" && "bg-fuchsia-200",
						status === "done" && "bg-fuchsia-300",
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
		</SortableContext>
	);
}

export default Column;
