import {
	useMemo,
	useState,
	useContext,
	useCallback,
	useEffect,
	useRef,
} from "react";
import { IonIcon } from "@ionic/react";
import { isEqual } from "lodash";

import { Project } from "../../types";
import { ProjectsContext } from "../../context/projects-context";

import MoreMenu from "../more-menu/more-menu";
import Task from "../task/task";

import "./project-card.scss";

const className = "project-card";
const classNamePrefix = `${className}__`;

const ProjectCard: React.FC<{
	project: Project;
}> = ({ project }) => {
	const [localProject, setLocalProject] = useState(Object.assign(project, {}));
	const { deleteProject, updateProject } = useContext(ProjectsContext);

	const tasks = useMemo(() => {
		if (!localProject) return [];
		return localProject.tasks;
	}, [localProject]);

	const projectRef = useRef<Project | null>(null);

	useEffect(() => {
		projectRef.current = { ...localProject };
	}, [localProject]);

	function handleUpdateProject(
		taskId: string,
		name: string,
		completed: boolean
	) {
		const copyTasks = projectRef.current.tasks.map((task) => {
			if (task._id === taskId) {
				task.name = name;
				task.completed = completed;
			}
			return task;
		});
		const newProject = { ...localProject, tasks: copyTasks };

		updateProject(newProject);
	}

	useEffect(() => {
		if (isEqual(localProject, project)) return;
		setLocalProject(Object.assign(project, {}));
	}, [project]);

	const menuItems = useMemo(() => {
		return [
			{
				name: "Delete",
				onClick: () => {
					deleteProject(localProject._id);
				},
			},
		];
	}, [localProject, deleteProject]);

	const handleDeleteTask = useCallback(
		(taskId: string) => {
			const newTasks = localProject.tasks.filter((task) => task._id !== taskId);
			const newProject = { ...localProject, tasks: newTasks };
			updateProject(newProject);
		},
		[localProject]
	);

	const handleNewTask = useCallback(() => {
		const newTasks = [...localProject.tasks, { name: "", completed: false }];
		const newProject = { ...localProject, tasks: newTasks };
		updateProject(newProject);
	}, [localProject]);

	return (
		<li className={className}>
			<h3>{localProject?.name}</h3>
			<div className={`${classNamePrefix}tasks`}>
				<ul>
					{tasks.map((task) => {
						const { _id, name, completed } = task;
						return (
							<Task
								key={_id}
								id={_id}
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
