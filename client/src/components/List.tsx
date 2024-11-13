import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import tasksData from "@/mock/tasksData.json";
import groupData from "@/mock/groupsData.json";
import type { ITask } from "@/types/data";
import { useState } from "react";

function List() {
	const [tasks, setTasks] = useState<ITask[]>(tasksData as ITask[]);

	const groupedTasks = tasks.reduce((acc: Record<string, ITask[]>, task) => {
		if (!acc[task.group_id]) {
			acc[task.group_id] = [];
		}
		acc[task.group_id].push(task);
		return acc;
	}, {});

	console.log("groupedTasks", groupedTasks);

	const test = groupData.map((group) => {
		return groupedTasks[group.id];
	});

	console.log(test);

	return (
		<Table>
			<TableHeader>
				<TableRow>
					<TableHead className="capitalize text-center font-bold">
						title
					</TableHead>
					<TableHead className="capitalize text-center font-bold">
						status
					</TableHead>
					<TableHead className="capitalize text-center font-bold">
						due date
					</TableHead>
					<TableHead className="capitalize text-center font-bold">
						description
					</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{groupData.map((group) => (
					<>
						<TableRow key={group.id} className="bg-gray-100">
							<TableCell colSpan={4} className="font-semibold text-left">
								{group.name}
							</TableCell>
						</TableRow>
						{groupedTasks[group.id]?.map((task) => (
							<TableRow key={task.id}>
								<TableCell className="font-medium text-left">
									{task.title}
								</TableCell>
								<TableCell className="capitalize">
									{task.status.replace("_", " ")}
								</TableCell>
								<TableCell>{task.due_date}</TableCell>
								<TableCell className="text-right max-w-52">
									{task.description}
								</TableCell>
							</TableRow>
						))}
					</>
				))}
			</TableBody>
		</Table>
	);
}

export default List;
