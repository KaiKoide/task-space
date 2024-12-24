import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

import TabsComponent from "./components/ui/tabs";
import Top from "./components/top";

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
				</div>
			</SignedIn>
		</>
	);
}

export default App;
