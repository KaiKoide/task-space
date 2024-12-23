import { Cookie } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
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
		fetchStatus();
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
				try {
					const { name } = values;

					const response = await fetch(
						`http://localhost:3000/api/v1/groups/${data.id}`,
						{
							method: "PUT",
							headers: {
								"Content-Type": "application/json",
							},
							body: JSON.stringify({ name }),
						},
					);

					if (!response.ok) throw new Error("Failed to update the group");

					updateGroup(data.id, name);
				} catch (error) {
					console.error("Error updating the group", error);
				}
			} else {
				try {
					const response = await fetch(
						`http://localhost:3000/api/v1/statuses/${data.id}`,
						{
							method: "PUT",
							headers: { "Content-Type": "application/json" },
							body: JSON.stringify({ status: values.name }),
						},
					);

					if (!response.ok) throw new Error("Failed to update the status");

					updateStatus(data.id, values.name);
				} catch (error) {
					console.error("Error updating the status to server", error);
				}
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
