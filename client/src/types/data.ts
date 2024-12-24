export interface IGroup {
	id: string;
	name: string;
	createdAt: string;
	createdBy: string;
}

export interface IGroupMembers {
	userId: string;
	groupId: string;
	role: string;
	joinedAt: string;
}

export interface IStatus {
	id: string;
	status: string;
	createdBy: string | null;
}

export interface ITags {
	id: string;
	name: string;
	color: string;
}

export interface ITask {
	id: string;
	title: string;
	description: string;
	createdAt: string;
	dueDate: string;
	statusId: string;
	groupId: string | undefined;
	createdBy: string;
}

export interface ITaskTags {
	taskId: string;
	tagId: string;
}

export interface IUser {
	id: string;
	name: string;
	email: string;
	password: string;
	createdAt: string;
}
