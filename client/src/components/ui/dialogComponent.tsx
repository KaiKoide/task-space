import { CirclePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

function DialogComponent() {
	return (
		<Dialog>
			<DialogTrigger asChild className="flex items-center justify-center gap-2">
				<Button variant="outline" className="font-bold">
					<CirclePlus />
					New Task
				</Button>
			</DialogTrigger>
			<DialogContent className="max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Edit profile</DialogTitle>
					<DialogDescription>
						Make changes to your profile here. Click save when you're done.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<p>Hello</p>
				</div>
				<DialogFooter>
					<Button type="submit" variant="outline">
						Save
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

export default DialogComponent;
