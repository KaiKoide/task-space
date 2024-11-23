import { zodResolver } from "@hookform/resolvers/zod";
import { FishSymbol } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

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
	data: IGroup | IStatus;
}

const formSchema = z.object({
	name: z.string().min(2),
});

function NameForm({ onSave, data }: NameFormProps) {
	const { updateGroup } = useGroupStore();
	const { updateStatus } = useStatusStore();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "name" in data ? data.name : data.status || "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		if ("name" in data) {
			updateGroup(data.id, values.name);
		} else {
			updateStatus(data.id, values.name);
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
					<Button type="submit" className="flex gap-1">
						Update Name
						<FishSymbol />
					</Button>
				</div>
			</form>
		</Form>
	);
}

export default NameForm;
