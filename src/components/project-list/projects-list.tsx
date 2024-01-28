import update from "immutability-helper";
import { useCallback, useContext, useRef, useEffect } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import ProjectCard from "../project-card/project-card";
import { Project, ProjectsArray } from "../../types";
import { ProjectsContext } from "../../context/projects-context";

import "./projects-list.scss";

const className = "projects-list";

const ProjectsList: React.FC = () => {
	const gridRef = useRef(null);
	const { projects, setProjects } = useContext(ProjectsContext);

	useEffect(() => {
		const grid = gridRef.current;
		adjustGridItemsHeight(grid);
	});

	const moveProject = useCallback(
		(dragIndex: number, hoverIndex: number) => {
			console.log("moveProject", {
				dragIndex: projects[dragIndex].name,
				hoverIndex: projects[hoverIndex].name,
			});
			// const newProjectsArray = [...projects];
			// const dragProject = newProjectsArray[dragIndex];
			// newProjectsArray.splice(dragIndex, 1);
			// newProjectsArray.splice(hoverIndex, 0, dragProject);
			// setProjects(newProjectsArray);

			const newProjectsArray = update(projects, {
				$splice: [
					[dragIndex, 1],
					[hoverIndex, 0, projects[dragIndex]],
				],
			});
			// console.log("newProjectsArray", newProjectsArray);
			setProjects(newProjectsArray);
		},
		[projects]
	);

	return (
		<DndProvider backend={HTML5Backend}>
			<ul className={className} ref={gridRef}>
				{projects.map((project: Project, index: number) => {
					const { _id, name, tasks } = project;
					return (
						<ProjectCard
							key={_id}
							project={project}
							name={name}
							tasks={tasks}
							moveProject={moveProject}
							index={index}
							_id={_id}
						/>
					);
				})}
			</ul>
		</DndProvider>
	);
};

const adjustGridItemsHeight = (grid) => {
	const items = grid.children;

	for (let i = 0; i < items.length; i++) {
		let item = items[i];
		let rowHeight = parseInt(
			window.getComputedStyle(grid).getPropertyValue("grid-auto-rows")
		);
		let rowGap = parseInt(
			window.getComputedStyle(grid).getPropertyValue("grid-row-gap")
		);
		let rowSpan = Math.ceil(
			(item.firstChild.getBoundingClientRect().height + rowGap) /
				(rowHeight + rowGap)
		);
		item.style.gridRowEnd = "span " + rowSpan;
	}
};

export default ProjectsList;
