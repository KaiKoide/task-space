import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import tasksData from "@/mock/tasksData.json";
import groupData from "@/mock/groupsData.json";
import type { ITask } from "@/types/data";
import { Badge } from "./ui/badge";
import { cn } from "@/lib/utils";

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
						<Card key={task.id} className="mb-5">
							<CardHeader>
								<CardTitle className="text-custom-text">{task.title}</CardTitle>
								<Badge>{groups[task.group_id]}</Badge>
								<CardDescription>{task.due_date}</CardDescription>
							</CardHeader>
							<CardContent>
								<p>{task.description}</p>
							</CardContent>
						</Card>
					))}
				</div>
			))}
		</div>
	);
}

export default Board;
