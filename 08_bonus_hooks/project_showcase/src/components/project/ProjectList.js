import ProjectListItem from "./ProjectListItem";
import { useState, useMemo } from "react";

const ProjectList = ({projects, searchQuery, phaseSelected, setEditingModeId, handleDelete}) => {

  const [test, setTest] = useState(0);

    const renderProjects = useMemo(() => projects
        .filter(project => {
          console.log("I am recalculating the collection")
          return (phaseSelected === "All" || project.phase === phaseSelected) && (project.name.toLowerCase().includes(searchQuery.toLowerCase()))
        })
        .map(project => (
        <ProjectListItem
        key={project.id}
        setEditingModeId={setEditingModeId}
        handleDelete={handleDelete}
        {...project}
        />
        )), [phaseSelected, searchQuery, projects, setEditingModeId, handleDelete])

  return (
    <section>
      <h2>Projects</h2>
      <button onClick={() => setTest(current => current + 1)}>Click me!</button>
      <ul className="cards">{renderProjects}</ul>
    </section>
  );
};

export default ProjectList;