import { Cookie } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
import { useUser } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import type { IGroup, IStatus } from "@/types/data";
import { useGroupStore, useStatusStore } from "@/store/useStore";

interface NameFormProps {
	onSave: () => void;
	data?: IGroup | IStatus;
	type?: "status" | "group";
	isEdit?: boolean;
}

const apiUrl = import.meta.env.VITE_API_URL;

const formSchema = z.object({
	name: z.string().min(2, {
		message: "Name must be at least 2 characters.",
	}),
});

function NameForm({ onSave, data, type, isEdit = false }: NameFormProps) {
	const { updateGroup, addGroupToServer } = useGroupStore();
	const { updateStatus, fetchStatus, addStatusToServer } = useStatusStore();

	const { user } = useUser();

	useEffect(() => {
		if (!user) {
			console.error("User is not authenticated.");
			alert("Error: User is not authenticated. Please log in.");
			return;
		}

		const userId = user.id;

		fetchStatus(userId);
	}, []);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: data ? ("name" in data ? data.name : data.status) : "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		if (!user) {
			console.error("User is not authenticated.");
			alert("Error: User is not authenticated. Please log in.");
			return;
		}

		if (isEdit && data) {
			if ("name" in data) {
				const { name } = values;

				toast.promise(
					fetch(`${apiUrl}/api/v1/groups/${data.id}`, {
						method: "PUT",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ name }),
					}).then((response) => {
						if (!response.ok) throw new Error("Failed to update group name");

						updateGroup(data.id, name);
					}),
					{
						loading: "Updating group name...",
						success: "Group name has been updated ;)",
						error: "Failed to updated group name :(",
					},
				);
			} else {
				toast.promise(
					fetch(`${apiUrl}/api/v1/statuses/${data.id}`, {
						method: "PUT",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({ status: values.name }),
					}).then((response) => {
						if (!response.ok)
							throw new Error("Failed to update the status name");

						updateStatus(data.id, values.name);
					}),
					{
						loading: "Updating status name...",
						success: "Status name has been updated ;)",
						error: "Failed to updated status name :(",
					},
				);
			}
		} else {
			if (type === "status") {
				const newStatus = {
					id: uuidv4().toString(),
					status: values.name,
					createdBy: user.id,
				};

				await addStatusToServer(newStatus);
			} else {
				const newGroup = {
					id: uuidv4().toString(),
					name: values.name,
					createdAt: new Date().toISOString(),
					createdBy: user.id,
				};

				await addGroupToServer(newGroup);
			}
		}
		onSave();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Name</FormLabel>
							<FormControl>
								<Input placeholder="name" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
				<div className="flex justify-end">
					<Button type="submit" className="flex gap-1 capitalize">
						{isEdit ? "Update Name" : `Create ${type}`}
						<Cookie />
					</Button>
				</div>
			</form>
		</Form>
	);
}

export default NameForm;
