import { useState } from "react";
// import reactLogo from './assets/react.svg'

import TopNav from "./components/top-nav";
import NewProject from "./components/new-project/new-project";
import ProjectsList from "./components/projects-list";

import "./App.scss";

const App = () => {
	const [projects, setProjects] = useState([]);

	return (
		<>
			<TopNav />
			<section className='section-prj-new'>
				<NewProject />
			</section>
			<section className='section-prj-list'>
				<ProjectsList projects={projects} />
			</section>
		</>
	);
};

export default App;
