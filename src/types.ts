export interface Task {
	id: string;
	name: string;
	completed: boolean;
}

export interface Project {
	name: string;
	id: string;
	data: Task[] | [];
}

export type ProjectsArray = Project[];
