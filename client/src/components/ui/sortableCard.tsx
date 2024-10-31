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
	return (
		<Card key={task.id} className="mb-5">
			<CardHeader>
				<CardTitle className="text-custom-text">{task.title}</CardTitle>
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
