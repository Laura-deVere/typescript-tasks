import { useState } from "react";
import nextId from "react-id-generator";
import { IonIcon } from "@ionic/react";

import Task from "../task/task";

import { Project, ProjectsArray } from "../../types";

import "./new-project.scss";

const className = "new-project";
const classNamePrefix = `${className}__`;

const baseProjId = "prj";
const baseTaskId = "tsk";

const NewProject: React.FC<{
	addProject: (project: Project) => void;
}> = ({ addProject }) => {
	const projectId = nextId(baseProjId);

	const [stateName, setStateName] = useState("");
	const [tasks, setTasks] = useState([
		{ id: nextId(baseTaskId), name: "", completed: false },
	]);

	const handleAddProject = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		addProject({ id: projectId, name: stateName, data: tasks });
	};

	const addTask = () => {
		setTasks((prevTasks) => {
			return [
				...prevTasks,
				{ id: nextId(baseTaskId), name: "", completed: false },
			];
		});
	};

	return (
		<div className={className}>
			<form onSubmit={handleAddProject}>
				<input
					type='text'
					value={stateName}
					onChange={(evt) => setStateName(evt.target.value)}
					placeholder='Project Name...'
				/>
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

				<div className={`${classNamePrefix}action-btns`}>
					<button type='button' className='add-task' onClick={addTask}>
						<IonIcon color='light' icon={"add-outline"} />
					</button>
					<button type='submit'>Save</button>
				</div>
			</form>
		</div>
	);
};

export default NewProject;
