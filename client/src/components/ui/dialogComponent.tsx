import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import TaskForm from "./taskForm";

interface DialogComponentProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function DialogComponent({ open, setOpen }: DialogComponentProps) {
	function handleCloseDialog() {
		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add new task</DialogTitle>
				</DialogHeader>
				<TaskForm onSave={handleCloseDialog} />
			</DialogContent>
		</Dialog>
	);
}

export default DialogComponent;
