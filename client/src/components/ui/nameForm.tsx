import { zodResolver } from "@hookform/resolvers/zod";
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
import type { IGroup } from "@/types/data";
import { useGroupStore } from "@/store/useStore";

interface NameFormProps {
	onSave: () => void;
	data: IGroup;
}

const formSchema = z.object({
	name: z.string().min(2),
});

function NameForm({ onSave, data }: NameFormProps) {
	const { updateGroup } = useGroupStore();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: data.name || "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		updateGroup(data.id, values.name);
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
					<Button type="submit">Update Name</Button>
				</div>
			</form>
		</Form>
	);
}

export default NameForm;
