import ProjectCard from "./project-card";

export interface Project {
	name: string;
	id: string;
	data: [];
}

type ProjectsArray = Project[];

const ProjectsList: React.FC<{ projects: ProjectsArray }> = ({ projects }) => {
	return (
		<ul>
			{projects.map((project: Project) => {
				const { id } = project;
				return <ProjectCard key={id} project={project} />;
			})}
		</ul>
	);
};

export default ProjectsList;
