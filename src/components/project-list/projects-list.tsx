import { useContext } from "react";
import ProjectCard from "../project-card/project-card";

import { Project } from "../../types";
import { ProjectsContext } from "../../context/projects-context";

import "./projects-list.scss";

const className = "projects-list";

const ProjectsList: React.FC = () => {
	const { projects } = useContext(ProjectsContext);
	return (
		<ul className={className}>
			{projects.map((project: Project) => {
				const { _id } = project;
				return <ProjectCard key={_id} project={project} />;
			})}
		</ul>
	);
};

export default ProjectsList;
