import { Ellipsis, Trash2, NotebookPen } from "lucide-react";
import { useState, type ReactNode } from "react";

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
import DialogComponent from "@/components/ui/dialogComponent";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

import { useTaskStore } from "@/store/useStore";
import type { ITask } from "@/types/data";

interface PopoverMenuProps {
	type: "task" | "column" | "list";
	data?: ITask;
	children?: ReactNode;
}

function PopoverMenu({ type, data, children }: PopoverMenuProps) {
	const { deleteTask } = useTaskStore();
	const [open, setOpen] = useState(false);

	function handleClickOption(option: string) {
		if (type === "task") {
			switch (option) {
				case "delete":
					if (data) {
						deleteTask(data.id);
					}
					break;
				case "edit":
					setOpen(true);
					break;
			}
		}
	}

	return (
		<Popover>
			<div className="flex gap-3 items-center">
				<PopoverTrigger asChild>
					<Ellipsis className="cursor-pointer" />
				</PopoverTrigger>
				<PopoverContent className="w-32">
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div
						className="flex gap-2 pb-3 hover:opacity-30 cursor-pointer items-center"
						onClick={() => handleClickOption("edit")}
					>
						<NotebookPen size={20} />
						<p>Edit</p>
					</div>
					<Dialog>
						<DialogTrigger asChild>
							<div className="flex gap-2 hover:opacity-30 cursor-pointer items-center">
								<Trash2 size={20} />
								<p>Delete</p>
							</div>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[425px]">
							<DialogHeader>
								<DialogTitle>Confirm Delete</DialogTitle>
								<DialogDescription>
									Do you really want to delete?
								</DialogDescription>
							</DialogHeader>

							<DialogFooter>
								<DialogClose asChild>
									<Button variant="outline">No</Button>
								</DialogClose>
								<DialogClose asChild>
									<Button
										type="submit"
										variant="destructive"
										onClick={() => handleClickOption("delete")}
									>
										Delete
									</Button>
								</DialogClose>
							</DialogFooter>
						</DialogContent>
					</Dialog>
				</PopoverContent>
				{children}
			</div>
			<DialogComponent
				open={open}
				setOpen={setOpen}
				isEdit={true}
				task={data}
			/>
		</Popover>
	);
}

export default PopoverMenu;
