import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import {
	Check,
	ChevronsUpDown,
	CalendarIcon,
	CirclePlus,
	PawPrint,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { useUser } from "@clerk/clerk-react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";

import { useTaskStore, useGroupStore, useStatusStore } from "@/store/useStore";
import { cn } from "@/lib/utils";
import type { ITask } from "@/types/data";

interface TaskFormProps {
	onSave: () => void;
	task?: ITask;
}

const formSchema = z.object({
	title: z.string().min(2, {
		message: "Title must be at least 2 characters.",
	}),
	description: z.string(),
	group: z.string({
		required_error: "Please select a group.",
	}),
	status: z.string({
		required_error: "Please select a status.",
	}),
	dueDate: z.date({
		required_error: "Please select a due date.",
	}),
});

function TaskForm({ onSave, task }: TaskFormProps) {
	const [newGroupName, setNewGroupName] = useState("");
	const [newStatus, setNewStatus] = useState("");
	const { addTask, updateTask, fetchTasks } = useTaskStore();
	const { groups, addGroupToServer } = useGroupStore();
	const { statuses, fetchStatus, addStatusToServer } = useStatusStore();

	const { user } = useUser();

	const apiUrl = import.meta.env.VITE_API_URL;

	useEffect(() => {
		if (!user) {
			console.error("User is not authenticated.");
			alert("Error: User is not authenticated. Please log in.");
			return;
		}

		const userId = user.id;

		fetchStatus(userId);
		fetchTasks(userId);
	}, []);

	const groupName = groups.find((group) => group.id === task?.groupId)?.name;
	const statusName = statuses.find(
		(status) => status.id === task?.statusId,
	)?.status;

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: task?.title || "",
			description: task?.description || "",
			group: task ? groupName : "",
			status: task ? statusName : "",
			dueDate: task?.dueDate ? new Date(task.dueDate) : undefined,
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (!user) {
			console.error("User is not authenticated.");
			alert("Error: User is not authenticated. Please log in.");
			return;
		}

		const newTask = {
			id: task?.id || uuidv4().toString(),
			title: values.title,
			description: values.description,
			dueDate: values.dueDate
				? new Date(values.dueDate).toISOString()
				: task?.dueDate || new Date().toISOString(),
			groupId: groups.find((group) => group.name === values.group)?.id,
			createdAt: task?.createdAt || new Date().toISOString(),
			statusId:
				task?.statusId ||
				(statuses.find((status) => status.status === values.status)
					?.id as string),
			createdBy: task?.createdBy || user.id,
		};

		if (task) {
			toast.promise(
				fetch(`${apiUrl}/api/v1/tasks/${task.id}`, {
					method: "PUT",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(newTask),
				}).then((response) => {
					if (!response.ok) throw new Error("Failed to update the task");

					updateTask(task.id, newTask);
				}),
				{
					loading: "Updating task...",
					success: "Task has been updated ;)",
					error: "Failed to updated task :(",
				},
			);
		} else {
			toast.promise(
				fetch(`${apiUrl}/api/v1/tasks`, {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(newTask),
				}).then((response) => {
					if (!response.ok) throw new Error("Failed to add the task");

					addTask(newTask);
				}),
				{
					loading: "Loading...",
					success: "New task has been created ;)",
					error: "Failed to add group :(",
				},
			);
		}
		onSave();
	}

	async function handleAddStatus() {
		if (newStatus === "") return;

		if (!user) {
			console.error("User is not authenticated.");
			alert("Error: User is not authenticated. Please log in.");
			return;
		}

		const status = {
			id: uuidv4().toString(),
			status: newStatus.trim(),
			createdBy: user.id,
		};

		try {
			await addStatusToServer(status);
			// Fetch the latest data from the server
			await fetchStatus(user.id);
			setNewStatus("");
		} catch (error) {
			console.error("Error adding status to server", error);
		}
	}

	async function handleAddGroup() {
		if (newGroupName === "") return;

		if (!user) {
			console.error("User is not authenticated.");
			alert("Error: User is not authenticated. Please log in.");
			return;
		}

		const newGroup = {
			id: uuidv4().toString(),
			name: newGroupName.trim(),
			createdAt: new Date().toISOString(),
			createdBy: user.id,
		};

		try {
			await addGroupToServer(newGroup);
			// Fetch the latest data from the server
			await fetchStatus(user.id);
			setNewGroupName("");
		} catch (error) {
			console.error("Error adding group to server", error);
		}
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter" && !newGroupName) {
			handleAddGroup();
		} else if (e.key === "Enter" && !newStatus) {
			handleAddStatus();
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="title"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Task title</FormLabel>
							<FormControl>
								<Input placeholder="title" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="group"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Group</FormLabel>
							<Popover onOpenChange={(open) => !open && setNewGroupName("")}>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											// biome-ignore lint/a11y/useSemanticElements: <explanation>
											role="combobox"
											className={cn(
												"w-[200px] justify-between rounded-md px-3 font-normal",
												!(field.value || task?.groupId) &&
													"text-muted-foreground",
											)}
										>
											{field.value
												? groups.find((group) => group.name === field.value)
														?.name
												: task?.groupId
													? groupName
													: "Select group"}
											<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-[200px] p-0 pointer-events-auto">
									<Command>
										<CommandInput
											placeholder="Search group..."
											onInput={(e) => setNewGroupName(e.currentTarget.value)}
											onKeyDown={(e) => handleKeyDown(e)}
										/>
										<CommandList>
											<CommandEmpty onClick={handleAddGroup}>
												<div className="flex items-center justify-center gap-1 text-custom-default">
													<CirclePlus strokeWidth={1.5} className="font-bold" />
													Add new group
												</div>
											</CommandEmpty>
											<CommandGroup>
												{groups.map((group) => (
													<CommandItem
														value={group.name}
														key={group.id}
														onSelect={() => {
															form.setValue("group", group.name);
														}}
													>
														{group.name}
														<Check
															className={cn(
																"ml-auto",
																group.name === field.value
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
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Status</FormLabel>
							<Popover onOpenChange={(open) => !open && setNewStatus("")}>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											// biome-ignore lint/a11y/useSemanticElements: <explanation>
											role="combobox"
											className={cn(
												"w-[200px] justify-between rounded-md px-3 font-normal",
												!(field.value || task?.statusId) &&
													"text-muted-foreground",
											)}
										>
											{field.value
												? statuses.find(
														(status) => status.status === field.value,
													)?.status
												: task?.statusId
													? statusName
													: "Select status"}
											<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-[200px] p-0 pointer-events-auto">
									<Command>
										<CommandInput
											placeholder="Search status..."
											onInput={(e) => setNewStatus(e.currentTarget.value)}
											onKeyDown={(e) => handleKeyDown(e)}
										/>
										<CommandList>
											<CommandEmpty onClick={handleAddStatus}>
												<div className="flex items-center justify-center gap-1 text-custom-default">
													<CirclePlus strokeWidth={1.5} className="font-bold" />
													Add new status
												</div>
											</CommandEmpty>
											<CommandGroup>
												{statuses.map((status) => (
													<CommandItem
														value={status.status}
														key={status.id}
														onSelect={() => {
															form.setValue("status", status.status);
														}}
													>
														{status.status}
														<Check
															className={cn(
																"ml-auto",
																status.status === field.value
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
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="dueDate"
					render={({ field }) => (
						<FormItem className="flex flex-col">
							<FormLabel>Due date</FormLabel>
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant={"outline"}
											className={cn(
												"w-[240px] pl-3 text-left font-normal rounded-md",
												!field.value && "text-muted-foreground",
											)}
										>
											{field.value
												? format(field.value, "yyyy/MM/dd")
												: task?.dueDate || <span>Pick a date</span>}
											<CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent
									className="w-auto p-0 z-50 pointer-events-auto"
									align="start"
								>
									<Calendar
										mode="single"
										selected={field.value}
										onSelect={field.onChange}
										disabled={(date) => date < new Date()}
										initialFocus
									/>
								</PopoverContent>
							</Popover>
							<FormMessage />
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Description</FormLabel>
							<FormControl>
								<Textarea
									placeholder="Description"
									className="resize-none"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-end">
					<Button type="submit" className="flex items-center gap-1">
						{task ? "Update Task" : "Create Task"}
						<PawPrint />
					</Button>
				</div>
			</form>
		</Form>
	);
}

export default TaskForm;
