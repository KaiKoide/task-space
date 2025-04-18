import { create } from "zustand";

import type { ITask, IGroup, IStatus } from "@/types/data";
import { toast } from "sonner";

interface TaskState {
	tasks: ITask[];
	setTasks: (updater: ((tasks: ITask[]) => ITask[]) | ITask[]) => void;
	addTask: (newTasks: ITask) => void;
	deleteTask: (id: string) => void;
	updateTask: (taskId: string, updatedTask: Partial<ITask>) => void;
	fetchTasks: (userId: string) => void;
}

interface GroupState {
	groups: IGroup[];
	deleteGroup: (groupId: string) => void;
	updateGroup: (groupId: string, updatedGroup: string) => void;
	fetchGroups: (userId: string) => void;
	addGroupToServer: (group: IGroup) => void;
}

interface StatusState {
	statuses: IStatus[];
	setStatus: (
		updater: ((statuses: IStatus[]) => IStatus[]) | IStatus[],
	) => void;
	deleteStatus: (statusId: string) => void;
	updateStatus: (statusId: string, updatedStatus: string) => void;
	fetchStatus: (userId: string) => void;
	addStatusToServer: (status: IStatus) => void;
}

const apiUrl = import.meta.env.VITE_API_URL;

const useTaskStore = create<TaskState>((set) => ({
	tasks: [],
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
	fetchTasks: async (userId: string) => {
		try {
			const res = await fetch(`${apiUrl}/api/v1/tasks/${userId}`);
			const data: ITask[] = await res.json();
			set({ tasks: data });
		} catch (error) {
			console.error("Failed to fetch tasks", error);
		}
	},
}));

const useGroupStore = create<GroupState>((set) => ({
	groups: [],
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
	fetchGroups: async (userId: string) => {
		try {
			const res = await fetch(`${apiUrl}/api/v1/groups/${userId}`);
			const data: IGroup[] = await res.json();
			set({ groups: data });
		} catch (error) {
			console.error("Failed to fetch groups", error);
		}
	},
	addGroupToServer: async (group: IGroup) => {
		toast.promise(
			fetch(`${apiUrl}/api/v1/groups`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(group),
			}).then(async (response) => {
				if (!response.ok) throw new Error("Failed to add group");

				set((state) => ({ groups: [...state.groups, group] }));

				return group;
			}),
			{
				loading: "Adding group...",
				success: "New group has been created ;)",
				error: "Failed to add group :(",
			},
		);
	},
}));

const useStatusStore = create<StatusState>((set) => ({
	statuses: [],
	setStatus: (updater) =>
		set((state) => ({
			statuses:
				typeof updater === "function" ? updater(state.statuses) : updater,
		})),
	deleteStatus: (deleteId: string) =>
		set((state) => ({
			statuses: state.statuses.filter((state) => state.id !== deleteId),
		})),
	updateStatus: (statusId: string, updatedStatus: string) =>
		set((state) => ({
			statuses: state.statuses.map((status) =>
				status.id === statusId ? { ...status, status: updatedStatus } : status,
			),
		})),
	fetchStatus: async (userId: string) => {
		try {
			const res = await fetch(`${apiUrl}/api/v1/statuses/${userId}`);
			const data: IStatus[] = await res.json();
			set({ statuses: data });
		} catch (error) {
			console.error("Failed to fetch statuses", error);
		}
	},
	addStatusToServer: async (status: IStatus) => {
		toast.promise(
			fetch(`${apiUrl}/api/v1/statuses`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(status),
			}).then(async (response) => {
				if (!response.ok) throw new Error("Failed to adding status");

				set((state) => ({ statuses: [...state.statuses, status] }));
			}),
			{
				loading: "Loading...",
				success: "New status has been created ;)",
				error: "Failed to add status :(",
			},
		);
	},
}));

export { useTaskStore, useGroupStore, useStatusStore };
