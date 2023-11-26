import ProjectCard from "../project-card/project-card";

import { ProjectsArray, Project } from "../../types";

import "./projects-list.scss";

const className = "projects-list";

const ProjectsList: React.FC<{
	projects: ProjectsArray;
	updateProject: (project: Project) => void;
}> = ({ projects, updateProject }) => {
	return (
		<ul className={className}>
			{projects.map((project: Project) => {
				const { id } = project;
				return (
					<ProjectCard
						key={id}
						project={project}
						updateProject={updateProject}
					/>
				);
			})}
		</ul>
	);
};

export default ProjectsList;