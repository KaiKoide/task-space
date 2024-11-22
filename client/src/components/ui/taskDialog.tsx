import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import TaskForm from "./taskForm";
import type { ITask } from "@/types/data";
import { PiggyBank } from "lucide-react";

interface TaskDialogProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isEdit?: boolean;
	task?: ITask | undefined;
}

function TaskDialog({ open, setOpen, isEdit = false, task }: TaskDialogProps) {
	function handleCloseDialog() {
		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<PiggyBank />
						{isEdit ? "Edit task" : "Add new task"}
					</DialogTitle>
				</DialogHeader>
				<TaskForm onSave={handleCloseDialog} task={task} />
			</DialogContent>
		</Dialog>
	);
}

export default TaskDialog;
