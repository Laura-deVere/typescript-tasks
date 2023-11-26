import { Project } from "../../types";

import Task from "../task/task";

import "./project-card.scss";

const className = "project-card";
const classNamePrefix = `${className}__`;

const ProjectCard: React.FC<{
	project: Project;
	updateProject: (project: Project) => void;
}> = ({ project, updateProject }) => {
	const tasks = project.data;

	const handleUpdateProject = (
		taskId: string,
		name: string,
		completed: boolean
	) => {
		const copy = [...tasks];
		const task = copy.find((task) => task.id === taskId);
		if (task) {
			task.name = name;
			task.completed = completed;
		}

		const newProject = { ...project, data: copy };
		updateProject(newProject);
	};

	return (
		<li className={className}>
			<h3>{project.name}</h3>
			<ul>
				<div className={`${classNamePrefix}tasks`}>
					<ul>
						{tasks.map((task) => {
							const { id, name, completed } = task;
							return (
								<Task
									key={id}
									id={id}
									name={name}
									completed={completed}
									onChange={handleUpdateProject}
								/>
							);
						})}
					</ul>
				</div>
			</ul>
		</li>
	);
};
export default ProjectCard;
