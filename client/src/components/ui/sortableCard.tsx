import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Badge } from "./badge";
import type { ITask } from "@/types/data";

interface SortableCardProps {
	task: ITask;
	groupName: string;
}

function SortableCard({ task, groupName }: SortableCardProps) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({
		id: task.id,
		data: {
			type: "Task",
			task,
		},
	});

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
		opacity: isDragging ? 0.5 : 1,
	};

	return (
		<Card
			key={task.id}
			className="mb-5"
			ref={setNodeRef}
			{...attributes}
			{...listeners}
			style={style}
		>
			<CardHeader>
				<CardTitle className="text-custom-default">{task.title}</CardTitle>
				<Badge>{groupName}</Badge>
				<CardDescription>{task.due_date}</CardDescription>
			</CardHeader>
			<CardContent>
				<p>{task.description}</p>
			</CardContent>
		</Card>
	);
}

export default SortableCard;
