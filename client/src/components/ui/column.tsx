import { useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	rectSortingStrategy,
	useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

import SortableCard from "./sortableCard";

import { Badge } from "./badge";
import { cn } from "@/lib/utils";
import type { ITask, IStatus } from "@/types/data";
import { useMemo } from "react";

interface ColumnProps {
	statusData: IStatus;
	groupedTasks: Record<string, ITask[]>;
	groups: Record<string, string>;
}

function Column({ statusData, groupedTasks, groups }: ColumnProps) {
	// const columnId = useMemo(
	// 	() => groupedTasks[status].map((task) => task.id),
	// 	[groupedTasks[status]],
	// );

	const columnId = status;

	// console.log("columnId", columnId);
	console.log("groupedTasks", groupedTasks);

	// const { setNodeRef } = useDroppable({ id: status });

	const { setNodeRef, attributes, listeners, transform, transition } =
		useSortable({
			id: columnId,
			data: { type: "Column", status },
		});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		// <SortableContext
		// 	id={status}
		// 	items={columnId}
		// 	strategy={rectSortingStrategy}
		// >
		<div ref={setNodeRef} style={style} className="bg-blue-100">
			<Badge
				className={cn(
					"capitalize mb-3 text-lg rounded-lg",
					statusData.status === "todo" && "bg-fuchsia-100",
					statusData.status === "in_progress" && "bg-fuchsia-200",
					statusData.status === "done" && "bg-fuchsia-300",
				)}
				{...attributes}
				{...listeners}
			>
				{statusData.status.replace("_", " ")}
			</Badge>

			{groupedTasks[statusData.status].map((task) => (
				<SortableCard
					key={task.id}
					task={task}
					groupName={groups[task.group_id]}
				/>
			))}
		</div>
		// </SortableContext>
	);
}

export default Column;
