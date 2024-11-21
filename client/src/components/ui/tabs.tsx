import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Board from "@/components/Board";
import { Button } from "@/components/ui/button";
import DialogComponent from "./dialogComponent";
import List from "../List";

function TabsComponent() {
	const [open, setOpen] = useState(false);

	return (
		<Tabs className="absolute top-12 left-0 w-full mx-10">
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
				<Tab
					className="px-4 py-2 cursor-pointer bg-white/50 focus:outline-none hover:opacity-70 border-t border-x border-custom-default rounded-t-md"
					selectedClassName="!bg-transparent"
				>
					Calendar
				</Tab>
				<Button
					onClick={() => setOpen(true)}
					variant="outline"
					className="font-bold"
				>
					<CirclePlus />
					New Task
				</Button>
				<DialogComponent open={open} setOpen={setOpen} />
			</TabList>

			<TabPanel>
				<Board />
			</TabPanel>
			<TabPanel>
				<List />
			</TabPanel>
			<TabPanel>
				<h2 className="text-lg font-semibold">Content for Tab 3</h2>
			</TabPanel>
		</Tabs>
	);
}

export default TabsComponent;
