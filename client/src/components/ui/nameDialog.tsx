import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import type { IGroup } from "@/types/data";
import NameForm from "./nameForm";

interface NameDialogProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	data: IGroup;
}

function NameDialog({ open, setOpen, data }: NameDialogProps) {
	function handleCloseDialog() {
		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit Name</DialogTitle>
				</DialogHeader>
				<NameForm onSave={handleCloseDialog} data={data} />
			</DialogContent>
		</Dialog>
	);
}

export default NameDialog;
