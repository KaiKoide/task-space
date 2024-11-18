import { useState } from "react";
import { Check, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import PopoverMenu from "./ui/popoverMenu";

import { cn } from "@/lib/utils";
import groupData from "@/mock/groupsData.json";
import statusData from "@/mock/statusData.json";
import { useTaskStore } from "@/store/useStore";
import type { ITask } from "@/types/data";

function List() {
	const { tasks } = useTaskStore();
	const [openState, setOpenState] = useState<{ [key: string]: boolean }>({});
	const [value, setValue] = useState<{ [key: string]: string }>({});

	const groupedTasks = tasks.reduce((acc: Record<string, ITask[]>, task) => {
		if (!acc[task.group_id]) {
			acc[task.group_id] = [];
		}
		acc[task.group_id].push(task);
		return acc;
	}, {});

	function handleOpenChange(taskId: string, isOpen: boolean) {
		setOpenState((prev) => ({ ...prev, [taskId]: isOpen }));
	}

	function handleStatusSelect(taskId: string, newValue: string) {
		setValue((prev) => ({ ...prev, [taskId]: newValue }));
		setOpenState((prev) => ({ ...prev, [taskId]: false }));
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
				{groupData.map((group) => (
					<>
						<TableRow key={group.id} className="bg-gray-100">
							<TableCell colSpan={4} className="font-semibold text-left">
								{group.name}
							</TableCell>
						</TableRow>
						{groupedTasks[group.id]?.map((task) => (
							<TableRow key={task.id}>
								<TableCell className="font-medium text-left">
									<PopoverMenu task={task}>{task.title}</PopoverMenu>
								</TableCell>
								<TableCell className="capitalize border-x border-custom-default/30">
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
													? value[task.id].replace("_", " ")
													: task.status.replace("_", " ")}
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-[200px] p-0">
											<Command>
												<CommandInput placeholder="Search status..." />
												<CommandList>
													<CommandEmpty>Add new status</CommandEmpty>
													<CommandGroup>
														{statusData.map((status) => (
															<CommandItem
																className="capitalize"
																key={status.id}
																value={status.status}
																onSelect={() =>
																	handleStatusSelect(task.id, status.status)
																}
															>
																{status.status.replace("_", " ")}
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
								<TableCell className="border-r border-custom-default/30">
									{task.due_date}
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
						<div className="flex items-center gap-2">
							<Plus />
							New group
						</div>
					</TableCell>
				</TableRow>
			</TableFooter>
		</Table>
	);
}

export default List;
