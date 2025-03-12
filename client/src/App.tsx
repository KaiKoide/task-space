import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

import TabsComponent from "./components/ui/tabs";
import Top from "./components/Top";
import { Toaster } from "sonner";

function App() {
	return (
		<>
			{/* When you're not logged in */}
			<SignedOut>
				<Top />
			</SignedOut>

			{/* When you're logged in */}
			<SignedIn>
				<div style={{ padding: "20px" }}>
					<UserButton />
					<TabsComponent />
					<Toaster richColors />
				</div>
			</SignedIn>
		</>
	);
}

export default App;
