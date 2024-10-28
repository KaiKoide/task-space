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

	return (
		<div className="flex justify-evenly gap-4 p-4">
			{Object.keys(groupedTasks).map((status) => (
				<div key={status}>
					<Badge className="capitalize mb-3">{status.replace("_", " ")}</Badge>

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
