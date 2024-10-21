import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import Board from "@/components/Board";

function TabsComponent() {
	return (
		<Tabs className="absolute top-12 left-0 w-full mx-10">
			<TabList className="flex border-b border-custom-border  gap-3">
				<Tab
					className="px-4 py-2 cursor-pointer bg-white/50 focus:outline-none hover:opacity-70 border-t border-x border-custom-border rounded-t-md"
					selectedClassName="!bg-transparent"
				>
					Board
				</Tab>
				<Tab
					className="px-4 py-2 cursor-pointer bg-white/50 focus:outline-none hover:opacity-70 border-t border-x border-custom-border rounded-t-md"
					selectedClassName="!bg-transparent"
				>
					List
				</Tab>
				<Tab
					className="px-4 py-2 cursor-pointer bg-white/50 focus:outline-none hover:opacity-70 border-t border-x border-custom-border rounded-t-md"
					selectedClassName="!bg-transparent"
				>
					Calendar
				</Tab>
			</TabList>

			<TabPanel className="p-4">
				<Board />
			</TabPanel>
			<TabPanel className="p-4">
				<h2 className="text-lg font-semibold">Content for Tab 2</h2>
			</TabPanel>
			<TabPanel className="p-4">
				<h2 className="text-lg font-semibold">Content for Tab 3</h2>
			</TabPanel>
		</Tabs>
	);
}

export default TabsComponent;
