export interface Task {
	_id: string;
	name: string;
	completed: boolean;
}

export interface Project {
	name: string;
	_id: string;
	tasks: Task[] | [];
}

export type ProjectsArray = Project[];
