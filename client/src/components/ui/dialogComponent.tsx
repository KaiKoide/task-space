import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import TaskForm from "./taskForm";
import type { ITask } from "@/types/data";

interface DialogComponentProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	isEdit?: boolean;
	task?: ITask | undefined;
}

function DialogComponent({
	open,
	setOpen,
	isEdit = false,
	task,
}: DialogComponentProps) {
	function handleCloseDialog() {
		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-[425px]">
				<DialogHeader>
					<DialogTitle>{isEdit ? "Edit task" : "Add new task"}</DialogTitle>
				</DialogHeader>
				<TaskForm onSave={handleCloseDialog} task={task} />
			</DialogContent>
		</Dialog>
	);
}

export default DialogComponent;
