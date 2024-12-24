import {
	SignedIn,
	SignedOut,
	UserButton,
	RedirectToSignUp,
} from "@clerk/clerk-react";

import TabsComponent from "./components/ui/tabs";

function App() {
	return (
		<>
			{/* When you're not logged in */}
			<SignedOut>
				<RedirectToSignUp />
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
