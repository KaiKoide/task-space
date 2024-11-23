import { create } from "zustand";

import tasksData from "@/mock/tasksData.json";
import groupsData from "@/mock/groupsData.json";
import statusData from "@/mock/statusData.json";
import type { ITask, IGroup, IStatus } from "@/types/data";

interface TaskState {
	tasks: ITask[];
	setTasks: (updater: ((tasks: ITask[]) => ITask[]) | ITask[]) => void;
	addTask: (newTasks: ITask) => void;
	deleteTask: (id: string) => void;
	updateTask: (taskId: string, updatedTask: Partial<ITask>) => void;
}

interface GroupState {
	groups: IGroup[];
	addGroup: (newGroup: IGroup) => void;
	deleteGroup: (groupId: string) => void;
	updateGroup: (groupId: string, updatedGroup: string) => void;
}

interface StatusState {
	statuses: IStatus[];
	setStatus: (
		updater: ((statuses: IStatus[]) => IStatus[]) | IStatus[],
	) => void;
	deleteStatus: (statusId: string) => void;
	updateStatus: (statusId: string, updatedStatus: string) => void;
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

const useGroupStore = create<GroupState>((set) => ({
	groups: groupsData as IGroup[],
	addGroup: (newGroup: IGroup) =>
		set((state) => ({ groups: [...state.groups, newGroup] })),
	deleteGroup: (groupId: string) =>
		set((state) => ({
			groups: state.groups.filter((group) => group.id !== groupId),
		})),
	updateGroup: (groupId: string, updatedGroup: string) =>
		set((state) => ({
			groups: state.groups.map((group) =>
				group.id === groupId ? { ...group, name: updatedGroup } : group,
			),
		})),
}));

const useStatusStore = create<StatusState>((set) => ({
	statuses: statusData as IStatus[],
	setStatus: (updater) =>
		set((state) => ({
			statuses:
				typeof updater === "function" ? updater(state.statuses) : updater,
		})),
	deleteStatus: (deleteId: number) =>
		set((state) => ({
			statuses: state.statuses.filter((state) => state.id !== deleteId),
		})),
	updateStatus: (statusId: number, updatedStatus: string) =>
		set((state) => ({
			statuses: state.statuses.map((status) =>
				status.id === statusId ? { ...status, status: updatedStatus } : status,
			),
		})),
}));

export { useTaskStore, useGroupStore, useStatusStore };
