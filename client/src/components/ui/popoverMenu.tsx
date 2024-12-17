import { Ellipsis, Trash2, NotebookPen, Ghost } from "lucide-react";
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
import NameDialog from "@/components/ui/nameDialog";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import TaskDialog from "@/components/ui/taskDialog";

import { useTaskStore, useGroupStore, useStatusStore } from "@/store/useStore";
import type { IGroup, IStatus, ITask } from "@/types/data";

interface PopoverMenuProps {
	type: "task" | "column" | "list";
	data: ITask | IGroup | IStatus;
	children?: ReactNode;
}

function PopoverMenu({ type, data, children }: PopoverMenuProps) {
	const { deleteTask, setTasks } = useTaskStore();
	const { deleteGroup } = useGroupStore();
	const { deleteStatus } = useStatusStore();
	const [open, setOpen] = useState(false);
	const [isEditName, setIsEditName] = useState(false);

	async function handleClickOption(option: string) {
		if (type === "task") {
			switch (option) {
				case "delete":
					try {
						const response = await fetch(
							`http://localhost:3000/api/v1/tasks/${data.id}`,
							{
								method: "DELETE",
							},
						);

						if (!response.ok) throw new Error("Failed to delete the task");

						deleteTask(data.id);
					} catch (error) {
						console.error("Error deleting the task", error);
					}
					break;
				case "edit":
					setOpen(true);
					break;
			}
		} else if (type === "list") {
			switch (option) {
				case "delete":
					try {
						const response = await fetch(
							`http://localhost:3000/api/v1/groups/${data.id}`,
							{ method: "DELETE" },
						);

						if (!response.ok) throw new Error("Failed to delete the group");

						deleteGroup(data.id);
						setTasks((prevTasks) =>
							prevTasks.filter((task) => task.groupId !== data.id),
						);
					} catch (error) {
						console.error("Error deleting the group", error);
					}

					break;
				case "edit":
					setIsEditName(true);
					break;
			}
		} else if (type === "column") {
			switch (option) {
				case "delete":
					try {
						const response = await fetch(
							`http://localhost:3000/api/v1/statuses/${data.id}`,
							{
								method: "DELETE",
							},
						);

						if (!response.ok) throw new Error("Failed to delete the status");

						deleteStatus(data.id);
						setTasks((prevTasks) =>
							prevTasks.filter((task) => task.statusId !== data.id),
						);
					} catch (error) {
						console.error("Error deleting the group", error);
					}
					break;
				case "edit":
					setIsEditName(true);
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
								<DialogTitle className="flex items-center">
									<Ghost />
									Confirm Delete
									<Ghost />
								</DialogTitle>
								<DialogDescription className="flex items-center">
									<Ghost />
									&lt; Do you really want to delete?
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
			<TaskDialog
				open={open}
				setOpen={setOpen}
				isEdit={true}
				task={type === "task" && data && "title" in data ? data : undefined}
			/>
			{data &&
				typeof data === "object" &&
				("status" in data || "name" in data) && (
					<NameDialog
						open={isEditName}
						setOpen={setIsEditName}
						data={data}
						isEdit={true}
					/>
				)}
		</Popover>
	);
}

export default PopoverMenu;
