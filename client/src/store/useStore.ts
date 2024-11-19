import { create } from "zustand";

import tasksData from "@/mock/tasksData.json";
import type { ITask } from "@/types/data";

interface TaskState {
	tasks: ITask[];
	setTasks: (updater: ((tasks: ITask[]) => ITask[]) | ITask[]) => void;
	addTask: (newTasks: ITask) => void;
	deleteTask: (id: string) => void;
	updateTask: (taskId: string, updatedTask: Partial<ITask>) => void;
}

const useTaskStore = create<TaskState>((set) => ({
	tasks: tasksData as ITask[],
	setTasks: (updater) =>
		set((state) => ({
			tasks: typeof updater === "function" ? updater(state.tasks) : updater,
		})),
	addTask: (newTask: ITask) =>
		set((state) => ({ tasks: [...state.tasks, newTask] })),
	deleteTask: (id: string) =>
		set((state) => ({
			tasks: state.tasks.filter((task) => task.id !== id),
		})),
	updateTask: (taskId: string, updatedTask: Partial<ITask>) =>
		set((state) => ({
			tasks: state.tasks.map((task) =>
				task.id === taskId ? { ...task, ...updatedTask } : task,
			),
		})),
}));

export { useTaskStore };
