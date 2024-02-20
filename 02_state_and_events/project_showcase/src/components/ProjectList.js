import { useState } from "react";
import ProjectListItem from "./ProjectListItem";

const ProjectList = ({ projects }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };
  const filteredProjects = projects.filter(
    (project) =>
      project.name.toLowerCase().includes(searchTerm) ||
      project.about.toLowerCase().includes(searchTerm)
  );
  const projectListItems =
    projects &&
    filteredProjects.map((project) => (
      <ProjectListItem key={project.id} {...project} />
    ));

  return (
    <section>
      <h2>Projects</h2>

      <div className="filter">
        <button>All</button>
        <button>Phase 5</button>
        <button>Phase 4</button>
        <button>Phase 3</button>
        <button>Phase 2</button>
        <button>Phase 1</button>
      </div>
      <input type="text" placeholder="Search..." onChange={handleChange} />

      <ul className="cards">{projectListItems}</ul>
    </section>
  );
};

export default ProjectList;
