import { SignInButton } from "@clerk/clerk-react";
import { Button } from "./ui/button";

function Top() {
	return (
		<div className="flex items-center justify-center flex-col h-screen gap-5">
			<h1>Task Space</h1>
			<SignInButton>
				<Button>Sign In</Button>
			</SignInButton>
		</div>
	);
}

export default Top;
