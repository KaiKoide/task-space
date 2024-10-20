import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

function TabsComponent() {
	return (
		<Tabs>
			<TabList className="flex border-b gap-3">
				<Tab
					className="px-4 py-2 cursor-pointer bg-white/50 focus:outline-none hover:opacity-70 border border-custom-border rounded-t-md"
					selectedClassName="!bg-transparent"
				>
					Tab 1
				</Tab>
				<Tab
					className="px-4 py-2 cursor-pointer bg-white/50 focus:outline-none hover:opacity-70 border border-custom-border rounded-t-md"
					selectedClassName="!bg-transparent"
				>
					Tab 2
				</Tab>
				<Tab
					className="px-4 py-2 cursor-pointer bg-white/50 focus:outline-none hover:opacity-70 border border-custom-border rounded-t-md"
					selectedClassName="!bg-transparent"
				>
					Tab 3
				</Tab>
			</TabList>

			<TabPanel className="p-4">
				<h2 className="text-lg font-semibold">Content for Tab 1</h2>
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
