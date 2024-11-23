import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import PopoverMenu from "@/components/ui/popoverMenu";
import SortableCard from "@/components/ui/sortableCard";

import { cn } from "@/lib/utils";
import type { ITask, IStatus } from "@/types/data";

interface ColumnProps {
	statusData: IStatus;
	groupedTasks: Record<string, ITask[]>;
	groups: Record<string, string>;
	isDragging: boolean;
}

function Column({ statusData, groupedTasks, groups, isDragging }: ColumnProps) {
	const taskIds = useMemo(
		() => (groupedTasks[statusData.status] || []).map((task) => task.id),
		[groupedTasks],
	);

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
		<div
			ref={setNodeRef}
			style={style}
			className="bg-blue-100 relative p-3 rounded-md w-80"
		>
			<Badge
				className={cn(
					"capitalize mb-3 text-lg rounded-lg border border-custom-default",
					statusData.status === "todo" && "bg-custom-badge-label-100",
					statusData.status === "in_progress" && "bg-custom-badge-label-200",
					statusData.status === "done" && "bg-custom-badge-label-300",
				)}
				{...attributes}
				{...listeners}
			>
				{statusData.status.replace("_", " ")}
			</Badge>
			<div className="absolute m-3 top-1 right-2 cursor-pointer">
				<PopoverMenu type={"column"} data={statusData} />
			</div>

			<SortableContext items={taskIds}>
				{(groupedTasks[statusData.status] || []).map((task) => (
					<SortableCard
						key={task.id}
						task={task}
						groupName={task.group_id ? groups[task.group_id] : "No Group"}
					/>
				))}
			</SortableContext>
		</div>
	);
}

export default Column;
