import { Cookie } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z } from "zod";
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
	const { updateGroup, addGroup } = useGroupStore();
	const { updateStatus, addStatus, fetchStatus } = useStatusStore();

	useEffect(() => {
		fetchStatus();
	}, []);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: data ? ("name" in data ? data.name : data.status) : "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		if (isEdit && data) {
			if ("name" in data) {
				updateGroup(data.id, values.name);
			} else {
				updateStatus(data.id, values.name);
			}
		} else {
			if (type === "status") {
				const newStatus = {
					id: uuidv4().toString(),
					status: values.name,
				};
				addStatus(newStatus);
			} else {
				const newGroup = {
					id: uuidv4().toString(),
					name: values.name,
					createdAt: new Date().toISOString(),
				};
				addGroup(newGroup);
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
