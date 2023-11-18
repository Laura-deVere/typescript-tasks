import { useState } from "react";

import "./task.scss";

const className = "task";
const classNamePrefix = `${className}__`;

const Task: React.FC<{ id: string; name: string; completed: boolean }> = ({
	id,
	name,
	completed,
}) => {
	const [checked, setChecked] = useState(completed ?? false);
	const [stateName, setStateName] = useState(name ?? "");

	return (
		<div className={className}>
			<div className='checkbox-wrapper'>
				<label>
					<span className='sr-only'>Task Completed</span>
					<input
						type='checkbox'
						id={id}
						name={id}
						onChange={() => setChecked(!checked)}
						checked={checked}
					/>
				</label>
			</div>
			<div className={`${classNamePrefix}input-wrapper`}>
				<label className='sr-only'>Task Name</label>
				<input
					type='text'
					value={stateName}
					onChange={(evt) => setStateName(evt.target.value)}
					placeholder='Task Name...'
				/>
			</div>
		</div>
	);
};

export default Task;
