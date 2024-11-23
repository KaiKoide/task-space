import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import type { IGroup, IStatus } from "@/types/data";
import NameForm from "./nameForm";
import { Rat } from "lucide-react";

interface NameDialogProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	data: IGroup | IStatus;
}

function NameDialog({ open, setOpen, data }: NameDialogProps) {
	function handleCloseDialog() {
		setOpen(false);
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle className="flex items-center gap-2">
						<Rat />
						Edit Name
					</DialogTitle>
				</DialogHeader>
				<NameForm onSave={handleCloseDialog} data={data} />
			</DialogContent>
		</Dialog>
	);
}

export default NameDialog;
