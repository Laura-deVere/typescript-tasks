import { Project } from "../../types";

import Task from "../task/task";

import "./project-card.scss";

const className = "project-card";
const classNamePrefix = `${className}__`;

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
	const tasks = project.data;
	return (
		<li className={className}>
			<h3>{project.name}</h3>
			<ul>
				<div className={`${classNamePrefix}tasks`}>
					<ul>
						{tasks.map((task) => {
							const { id, name, completed } = task;
							return (
								<Task key={id} id={id} name={name} completed={completed} />
							);
						})}
					</ul>
				</div>
			</ul>
		</li>
	);
};
export default ProjectCard;
