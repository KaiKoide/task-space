import { SignInButton } from "@clerk/clerk-react";
import { Button } from "./ui/button";

function Top() {
	return (
		<div className="min-h-screen flex items-center justify-center flex-col gap-16 py-20">
			<h1 className="lg:text-8xl ">Task Space</h1>
			<p className="lg:text-xl md:text-lg text-center px-5 md:px-10">
				Organize your tasks efficiently with our app-switch seamlessly between
				Kanban and list views, customize statuses, and stay on top of deadlines.
			</p>
			<SignInButton>
				<Button size="lg" className="vibrate-1 ">
					Sign In
				</Button>
			</SignInButton>

			<img className="w-[600px] h-auto " src="/images/board.webp" alt="board" />
			<img className="w-[600px] h-auto" src="/images/list.webp" alt="list" />
		</div>
	);
}

export default Top;
