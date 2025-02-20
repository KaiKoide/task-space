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
		() => (groupedTasks[statusData.id] || []).map((task) => task.id),
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
			className="backdrop-blur-sm bg-white/50 relative p-3 rounded-md min-w-80 min-h-60"
		>
			<div className="flex justify-center">
				<Badge
					variant="secondary"
					className={cn("capitalize mb-3 text-lg rounded-lg")}
					{...attributes}
					{...listeners}
				>
					{statusData.status}
				</Badge>
			</div>
			<div className="absolute m-3 top-1 right-2 cursor-pointer">
				<PopoverMenu type={"column"} data={statusData} />
			</div>

			<SortableContext items={taskIds}>
				{(groupedTasks[statusData.id] || []).map((task) => (
					<SortableCard
						key={task.id}
						task={task}
						groupName={task.groupId ? groups[task.groupId] : "No Group"}
					/>
				))}
			</SortableContext>
		</div>
	);
}

export default Column;
