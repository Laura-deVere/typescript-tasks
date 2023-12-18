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
	const [projectId, setProjectId] = useState(nextId(baseProjId));

	const [stateName, setStateName] = useState("");
	const [tasks, setTasks] = useState([
		{ id: nextId(baseTaskId), name: "", completed: false },
	]);

	const handleAddProject = (evt: React.FormEvent<HTMLFormElement>) => {
		evt.preventDefault();
		addProject({ id: projectId, name: stateName, data: tasks });
		handleReset();
	};

	const handleReset = () => {
		setStateName("");
		setTasks([{ id: nextId(baseTaskId), name: "", completed: false }]);
		setProjectId(nextId(baseProjId));
	};

	const addTask = () => {
		setTasks((prevTasks) => {
			return [
				...prevTasks,
				{ id: nextId(baseTaskId), name: "", completed: false },
			];
		});
	};

	const handleTaskChange = (id: string, name: string, completed: boolean) => {
		setTasks((prevTasks) => {
			const taskIndex = prevTasks.findIndex((task) => task.id === id);
			const newTask = { ...prevTasks[taskIndex], name, completed };
			const newTasks = [...prevTasks];
			newTasks[taskIndex] = newTask;
			return newTasks;
		});
	};

	const handleDeleteTask = (taskId: string) => {
		setTasks((prevTasks) => {
			return prevTasks.filter((task) => task.id !== taskId);
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
								<Task
									key={id}
									id={id}
									name={name}
									completed={completed}
									onChange={handleTaskChange}
									onDelete={handleDeleteTask}
								/>
							);
						})}
					</ul>
				</div>

				<div className={`${classNamePrefix}action-btns`}>
					<button type='button' className='add-task' onClick={addTask}>
						<IonIcon color='light' icon={"add-outline"} />
					</button>
					<button type='submit' disabled={!stateName}>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export default NewProject;
