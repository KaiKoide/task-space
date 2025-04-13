import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Board from "@/components/Board";
import { Button } from "@/components/ui/button";
import TaskDialog from "@/components/ui/taskDialog";
import List from "../List";

function TabsComponent() {
	const [open, setOpen] = useState(false);

	return (
		<Tabs className="top-12 w-full">
			<TabList className="flex border-b border-custom-default gap-3">
				<Tab
					className="px-4 py-2 cursor-pointer bg-white/50 focus:outline-none hover:opacity-70 border-t border-x border-custom-default rounded-t-md"
					selectedClassName="!bg-transparent"
				>
					Board
				</Tab>
				<Tab
					className="px-4 py-2 cursor-pointer bg-white/50 focus:outline-none hover:opacity-70 border-t border-x border-custom-default rounded-t-md"
					selectedClassName="!bg-transparent"
				>
					List
				</Tab>
				<Button
					onClick={() => setOpen(true)}
					variant="outline"
					className="font-bold"
				>
					<CirclePlus />
					New Task
				</Button>
				<TaskDialog open={open} setOpen={setOpen} />
			</TabList>

			<TabPanel>
				<Board />
			</TabPanel>
			<TabPanel>
				<List />
			</TabPanel>
		</Tabs>
	);
}

export default TabsComponent;
