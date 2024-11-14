import { Ellipsis, Trash2, NotebookPen } from "lucide-react";
import type { ReactNode } from "react";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";

function PopoverComponent({ children }: { children: ReactNode }) {
	function handleClickOption(option: string) {
		console.log(option);
	}

	return (
		<Popover>
			<div className="flex gap-3 items-center">
				<PopoverTrigger asChild>
					<Ellipsis className="cursor-pointer" />
				</PopoverTrigger>
				<PopoverContent className="w-32">
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div
						className="flex gap-2 pb-3 hover:opacity-30 cursor-pointer items-center"
						onClick={() => handleClickOption("edit")}
					>
						<NotebookPen size={20} />
						<p>Edit</p>
					</div>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div
						className="flex gap-2 hover:opacity-30 cursor-pointer items-center"
						onClick={() => handleClickOption("delete")}
					>
						<Trash2 size={20} />
						<p>Delete</p>
					</div>
				</PopoverContent>
				{children}
			</div>
		</Popover>
	);
}

export default PopoverComponent;
