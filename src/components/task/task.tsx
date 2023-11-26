import { useCallback } from "react";

import Checkbox from "../checkbox/checkbox";

import "./task.scss";

const className = "task";
const classNamePrefix = `${className}__`;

const Task: React.FC<{
	id: string;
	name: string;
	completed: boolean;
	onChange: (id: string, value: string, completed: boolean) => void;
}> = ({ id, name, completed, onChange }) => {
	const onNameChangeHandler = useCallback(
		(value: string) => {
			onChange(id, value, completed);
		},
		[id, name, completed, onChange]
	);

	const onCompletedChangeHandler = useCallback(
		(value: boolean) => {
			onChange(id, name, value);
		},
		[id, name, completed, onChange]
	);

	return (
		<li className={className}>
			<Checkbox
				checked={completed}
				handleOnChange={(evt, checked) => {
					evt.preventDefault();
					onCompletedChangeHandler(checked);
				}}
				id={id}
				label={name}
			/>
			<div className={`${classNamePrefix}input-wrapper`}>
				<label className='sr-only'>Task Name</label>
				<input
					type='text'
					value={name}
					onChange={(evt) => onNameChangeHandler(evt.target.value)}
					placeholder='Task Name...'
				/>
			</div>
		</li>
	);
};

export default Task;
