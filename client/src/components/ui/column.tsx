import { useDroppable } from "@dnd-kit/core";
import {
	SortableContext,
	rectSortingStrategy,
	useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Trash2 } from "lucide-react";

import SortableCard from "./sortableCard";

import { Badge } from "./badge";
import { cn } from "@/lib/utils";
import type { ITask, IStatus } from "@/types/data";

interface ColumnProps {
	statusData: IStatus;
	groupedTasks: Record<string, ITask[]>;
	groups: Record<string, string>;
	isDragging: boolean;
}

function Column({ statusData, groupedTasks, groups, isDragging }: ColumnProps) {
	// const columnId = useMemo(
	// 	() => groupedTasks[status].map((task) => task.id),
	// 	[groupedTasks[status]],
	// );

	// const { setNodeRef } = useDroppable({ id: status });

	function handleDelete() {
		console.log("click!");
	}

	const { setNodeRef, attributes, listeners, transform, transition } =
		useSortable({
			id: statusData.id,
			data: { type: "Column", statusData },
		});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	return (
		// <SortableContext
		// 	id={status}
		// 	items={columnId}
		// 	strategy={rectSortingStrategy}
		// >
		<div
			ref={setNodeRef}
			style={style}
			className="bg-blue-100 relative p-3 rounded-md"
		>
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
			<Trash2
				className="absolute top-1.5 right-2 cursor-pointer"
				onClick={handleDelete}
			/>

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
