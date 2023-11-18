import { useState } from "react";
import nextId from "react-id-generator";
import { IonIcon } from "@ionic/react";

import Task from "../task/task";

import "./new-project.scss";

const className = "new-project";
const classNamePrefix = `${className}__`;

const baseProjId = "prj";
const baseTaskId = "tsk";

const NewProject = () => {
	const projectId = nextId(baseProjId);

	const [stateName, setStateName] = useState("");
	const [tasks, setTasks] = useState([
		{ id: nextId(baseTaskId), name: "", completed: false },
	]);

	return (
		<div className={className}>
			<form>
				<input
					type='text'
					value={stateName}
					onChange={(evt) => setStateName(evt.target.value)}
					placeholder='Project Name...'
				/>
				<ul className={`${classNamePrefix}tasks`}>
					{tasks.map((task) => {
						const { id, name, completed } = task;
						return (
							<li>
								<Task key={id} id={id} name={name} completed={completed} />
							</li>
						);
					})}
				</ul>
				<div>
					<button type='button' className='add-task'>
						<IonIcon icon='add-outline' color='hotpink' />
					</button>
				</div>
				<button type='submit'>Save</button>
			</form>
		</div>
	);
};

export default NewProject;
