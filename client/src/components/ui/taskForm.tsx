import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Check, ChevronsUpDown, CalendarIcon, CirclePlus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";

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

import { useTaskStore, useGroupStore } from "@/store/useStore";
import { cn } from "@/lib/utils";

const formSchema = z.object({
	title: z.string().min(2, {
		message: "Username must be at least 2 characters.",
	}),
	description: z.string(),
	group: z.string({
		required_error: "Please select a group.",
	}),
	dueDate: z.date({
		required_error: "A due date is required.",
	}),
});

function TaskForm({ onSave }: { onSave: () => void }) {
	const [newGroupName, setNewGroupName] = useState("");
	const { addTask } = useTaskStore();
	const { groups, addGroup } = useGroupStore();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			title: "",
			description: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		const newTask = {
			id: uuidv4().toString(),
			title: values.title,
			description: values.description,
			due_date: values.dueDate.toISOString(),
			group_id: groups.find((group) => group.name === values.group)?.id,
			created_at: new Date().toISOString(),
			status: "todo" as const,
			created_by: "a1b2c3d4-5678-90ab-cdef-1234567890ab",
		};
		addTask(newTask);
		onSave();
	}

	function handleAddGroup() {
		const newGroup = {
			id: uuidv4().toString(),
			name: newGroupName,
			created_at: new Date().toISOString(),
		};
		addGroup(newGroup);
	}

	function handleChange(e: React.FormEvent<HTMLInputElement>) {
		setNewGroupName(e.currentTarget.value);
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
							<Popover>
								<PopoverTrigger asChild>
									<FormControl>
										<Button
											variant="outline"
											// biome-ignore lint/a11y/useSemanticElements: <explanation>
											role="combobox"
											className={cn(
												"w-[200px] justify-between rounded-md px-3 font-normal",
												!field.value && "text-muted-foreground",
											)}
										>
											{field.value
												? groups.find((group) => group.name === field.value)
														?.name
												: "Select group"}
											<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
										</Button>
									</FormControl>
								</PopoverTrigger>
								<PopoverContent className="w-[200px] p-0 pointer-events-auto">
									<Command>
										<CommandInput
											placeholder="Search group..."
											onInput={handleChange}
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
											{field.value ? (
												format(field.value, "PPP")
											) : (
												<span>Pick a date</span>
											)}
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
					<Button type="submit">Submit</Button>
				</div>
			</form>
		</Form>
	);
}

export default TaskForm;
