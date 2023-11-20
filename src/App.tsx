import { useState } from "react";
// import reactLogo from './assets/react.svg'

import { Project, ProjectsArray } from "./types";

import TopNav from "./components/top-nav";
import NewProject from "./components/new-project/new-project";
import ProjectsList from "./components/project-list/projects-list";

import "./App.scss";

const DATA = [
	{
		id: "prj1",
		name: "Project 1",
		data: [
			{ id: "tsk1", name: "Task 1", completed: false },
			{ id: "tsk2", name: "Task 2", completed: false },
			{ id: "tsk3", name: "Task 3", completed: false },
		],
	},
	{
		id: "prj2",
		name: "Project 2",
		data: [
			{ id: "tsk4", name: "Task 4", completed: false },
			{ id: "tsk5", name: "Task 5", completed: false },
			{ id: "tsk6", name: "Task 6", completed: false },
		],
	},
	{
		id: "prj3",
		name: "Project 3",
		data: [
			{ id: "tsk7", name: "Task 7", completed: false },
			{ id: "tsk8", name: "Task 8", completed: false },
			{ id: "tsk9", name: "Task 9", completed: false },
		],
	},
];

const App = () => {
	const [projects, setProjects] = useState<ProjectsArray>(DATA);

	const addProject = (project: Project) => {
		setProjects((prevProjects: ProjectsArray) => {
			return [...prevProjects, project];
		});
	};
	console.log(projects);
	return (
		<>
			<TopNav />
			<section className='section-prj-new'>
				<NewProject addProject={addProject} />
			</section>
			<section className='section-prj-list'>
				<ProjectsList projects={projects} />
			</section>
		</>
	);
};

export default App;
