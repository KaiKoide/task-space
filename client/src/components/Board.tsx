import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import tasksData from "@/mock/tasksData.json";
import { Badge } from "./ui/badge";

function Board() {
	return (
		<div className="grid gap-3">
			{tasksData.map((task) => (
				<Card key={task.id}>
					<CardHeader>
						<CardTitle className="text-custom-text">{task.title}</CardTitle>
						<Badge>badge</Badge>
						<CardDescription>{task.due_date}</CardDescription>
					</CardHeader>
					<CardContent>
						<p>{task.description}</p>
					</CardContent>
				</Card>
			))}
		</div>
	);
}

export default Board;
