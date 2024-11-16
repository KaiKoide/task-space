import { create } from "zustand";

import tasksData from "@/mock/tasksData.json";
import type { ITask } from "@/types/data";

interface TaskState {
	tasks: ITask[];
	setTasks: (newTasks: ITask[]) => void;
	addTask: (newTasks: ITask) => void;
	deleteTask: (id: string) => void;
	updateTask: (taskId: string, updatedTask: ITask) => void;
}

const useTaskStore = create<TaskState>((set) => ({
	tasks: tasksData as ITask[],
	setTasks: (newTasks: ITask[]) => set({ tasks: newTasks }),
	addTask: (newTask: ITask) =>
		set((state) => ({ tasks: [...state.tasks, newTask] })),
	deleteTask: (id: string) =>
		set((state) => ({
			tasks: state.tasks.filter((task) => task.id !== id),
		})),
	updateTask: (taskId: string, updatedTask: ITask) =>
		set((state) => ({
			tasks: state.tasks.map((task) =>
				task.id === taskId ? { ...task, ...updatedTask } : task,
			),
		})),
}));

export { useTaskStore };
