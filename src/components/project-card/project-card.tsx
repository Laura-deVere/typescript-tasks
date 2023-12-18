import { useMemo } from "react";
import nextId from "react-id-generator";
import { IonIcon } from "@ionic/react";

import { Project } from "../../types";

import MoreMenu from "../more-menu/more-menu";
import Task from "../task/task";

import "./project-card.scss";

const className = "project-card";
const classNamePrefix = `${className}__`;

const baseTaskId = "tsk";

const ProjectCard: React.FC<{
	project: Project;
	updateProject: (project: Project) => void;
	deleteProject: (projectId: string) => void;
}> = ({ project, updateProject, deleteProject }) => {
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

	const menuItems = useMemo(() => {
		return [
			{
				name: "Delete",
				onClick: () => {
					deleteProject(project.id);
				},
			},
		];
	}, [project, deleteProject]);

	const handleDeleteTask = (taskId: string) => {
		const newTasks = tasks.filter((task) => task.id !== taskId);
		const newProject = { ...project, data: newTasks };
		updateProject(newProject);
	};

	const handleNewTask = () => {
		const newTasks = [
			...tasks,
			{ id: nextId(baseTaskId), name: "", completed: false },
		];
		const newProject = { ...project, data: newTasks };
		updateProject(newProject);
	};

	return (
		<li className={className}>
			<h3>{project.name}</h3>
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
								onDelete={handleDeleteTask}
							/>
						);
					})}
				</ul>
			</div>
			<footer className={`${classNamePrefix}footer`}>
				<button
					type='button'
					className={`${classNamePrefix}new-task`}
					onClick={handleNewTask}
				>
					<IonIcon color='light' icon={"add-outline"} />
				</button>
				<MoreMenu items={menuItems} />
			</footer>
		</li>
	);
};
export default ProjectCard;
