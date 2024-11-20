import { CirclePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import TaskForm from "./taskForm";

function DialogComponent() {
	return (
		<Dialog>
			<DialogTrigger asChild className="flex items-center justify-center gap-2">
				<Button variant="outline" className="font-bold">
					<CirclePlus />
					New Task
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add new task</DialogTitle>
				</DialogHeader>
				<TaskForm />
				<DialogFooter>
					<DialogClose asChild>
						<Button type="submit" variant="outline">
							Save
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default DialogComponent;
