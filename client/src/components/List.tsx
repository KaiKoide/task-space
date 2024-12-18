import { format } from "date-fns";
import { Check, CirclePlus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import NameDialog from "@/components/ui/nameDialog";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import PopoverMenu from "@/components/ui/popoverMenu";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import { cn } from "@/lib/utils";
import { useTaskStore, useGroupStore, useStatusStore } from "@/store/useStore";
import type { ITask } from "@/types/data";

function List() {
	const { tasks, updateTask, fetchTasks } = useTaskStore();
	const { groups, fetchGroups } = useGroupStore();
	const { statuses, fetchStatus, addStatusToServer } = useStatusStore();
	const [openState, setOpenState] = useState<{ [key: string]: boolean }>({});
	const [value, setValue] = useState<{ [key: string]: string }>({});
	const [open, setOpen] = useState(false);
	const [newStatusName, setNewStatusName] = useState("");

	useEffect(() => {
		fetchStatus();
		fetchTasks();
		fetchGroups();
	}, []);

	const groupedTasks = tasks.reduce((acc: Record<string, ITask[]>, task) => {
		const groupId = task.groupId || "no_group";
		if (!acc[groupId]) {
			acc[groupId] = [];
		}
		acc[groupId].push(task);
		return acc;
	}, {});

	function handleOpenChange(taskId: string, isOpen: boolean) {
		setOpenState((prev) => ({ ...prev, [taskId]: isOpen }));
	}

	async function handleStatusSelect(taskId: string, newValueId: string) {
		const status = statuses.find((status) => status.id === newValueId)?.status;

		if (status) {
			try {
				const response = await fetch(
					`http://localhost:3000/api/v1/tasks/${taskId}`,
					{
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ statusId: newValueId }),
					},
				);

				if (!response.ok) throw new Error("Failed to update the task");

				setValue((prev) => ({
					...prev,
					[taskId]: status,
				}));
				setOpenState((prev) => ({ ...prev, [taskId]: false }));
				updateTask(taskId, { statusId: newValueId });
			} catch (error) {
				console.error("Error updating the task to server", error);
			}
		}
	}

	async function handleAddStatus() {
		const newStatus = {
			id: uuidv4().toString(),
			status: newStatusName.trim(),
		};
		await addStatusToServer(newStatus);
		setNewStatusName("");
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") handleAddStatus();
	}

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
				{groups.map((group) => (
					<>
						<TableRow key={group.id} className="bg-gray-100">
							<TableCell colSpan={4} className="font-semibold text-left">
								<PopoverMenu type={"list"} data={group}>
									{group.name}
								</PopoverMenu>
							</TableCell>
						</TableRow>
						{groupedTasks[group.id]?.map((task) => (
							<TableRow key={task.id}>
								<TableCell className="font-medium text-left">
									<PopoverMenu type={"task"} data={task}>
										{task.title}
									</PopoverMenu>
								</TableCell>
								<TableCell className="capitalize border-x text-center border-custom-default/30">
									<Popover
										open={openState[task.id] || false}
										onOpenChange={(isOpen) => handleOpenChange(task.id, isOpen)}
									>
										<PopoverTrigger asChild>
											<Button
												variant="outline"
												// biome-ignore lint/a11y/useSemanticElements: <explanation>
												role="combobox"
												className="w-30 justify-between capitalize"
											>
												{value[task.id]
													? value[task.id]
													: statuses.find(
															(status) => status.id === task.statusId,
														)?.status}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-[200px] p-0">
											<Command>
												<CommandInput
													placeholder="Search status..."
													onInput={(e) =>
														setNewStatusName(e.currentTarget.value)
													}
													onKeyDown={handleKeyDown}
												/>
												<CommandList>
													<CommandEmpty onClick={handleAddStatus}>
														<div className="flex items-center justify-center gap-1 text-custom-default">
															<CirclePlus
																strokeWidth={1.5}
																className="font-bold"
															/>
															Add new status
														</div>
													</CommandEmpty>
													<CommandGroup>
														{statuses.map((status) => (
															<CommandItem
																className="capitalize"
																key={status.id}
																value={status.status}
																onSelect={() =>
																	handleStatusSelect(task.id, status.id)
																}
															>
																{status.status}
																<Check
																	className={cn(
																		"ml-auto",
																		value[task.id] === status.status
																			? "opacity-100"
																			: "opacity-0",
																	)}
																/>
															</CommandItem>
														))}
													</CommandGroup>
												</CommandList>
											</Command>
										</PopoverContent>
									</Popover>
								</TableCell>
								<TableCell className="border-r text-center border-custom-default/30">
									{format(task.dueDate, "yyyy-MM-dd")}
								</TableCell>
								<TableCell className="text-right max-w-52">
									{task.description}
								</TableCell>
							</TableRow>
						))}
					</>
				))}
			</TableBody>
			<TableFooter>
				<TableRow>
					<TableCell
						colSpan={4}
						className="cursor-pointer hover:bg-slate-200/30"
					>
						{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<div
							className="flex items-center gap-2"
							onClick={() => setOpen(true)}
						>
							<Plus />
							New group
						</div>
						<NameDialog open={open} setOpen={setOpen} type={"group"} />
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}

export default List;
