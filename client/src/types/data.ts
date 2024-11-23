export interface IGroup {
	id: string;
	name: string;
	created_at: string;
}

export interface IGroupMembers {
	user_id: string;
	group_id: string;
	role: string;
	joined_at: string;
}

export interface IStatus {
	id: string;
	status: string;
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
	created_at: string;
	due_date: string;
	status_id: string;
	group_id: string | undefined;
	created_by: string;
}

export interface ITaskTags {
	task_id: string;
	tag_id: string;
}

export interface IUser {
	id: string;
	name: string;
	email: string;
	password: string;
	created_at: string;
}
