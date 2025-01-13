import { SignInButton } from "@clerk/clerk-react";
import { Button } from "./ui/button";

function Top() {
	return (
		<div className="flex items-center justify-center flex-col h-screen gap-5">
			<h1 className="lg:text-8xl">Task Space</h1>
			<p className="lg:text-xl">
				Organize your tasks efficiently with our app—switch seamlessly between
				Kanban and list views, customize statuses, and stay on top of deadlines.
			</p>
			<SignInButton>
				<Button size="lg" className="vibrate-1 ">
					Sign In
				</Button>
			</SignInButton>
			<div>
				<img className="w-80 h-auto " src="/images/board.webp" alt="board" />
				<img className="w-80 h-auto" src="/images/list.webp" alt="list" />
			</div>
		</div>
	);
}

export default Top;
