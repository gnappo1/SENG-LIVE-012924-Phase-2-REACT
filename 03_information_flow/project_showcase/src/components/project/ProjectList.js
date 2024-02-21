import { useState } from 'react';
import ProjectListItem from "./ProjectListItem";

const ProjectList = ({ searchQuery, phaseSelected, sortingObj }) => {
  const [projects, setProjects] = useState([]);

  const handleClick = () => {
    loadProjects();
  };
  
  const loadProjects = () => {
    fetch("http://localhost:4000/projects")
    .then((res) => res.json())
    .then((projects) => setProjects(projects))
    .catch(err => console.log(err));
  }

  const finalProjects = projects.filter(project => {
    return (phaseSelected === "All" || project.phase === phaseSelected) && (searchQuery === "" || project.name.toLowerCase().includes(searchQuery.toLowerCase()))
  })

  const sortedProjects = [...finalProjects].sort((a, b) => {
    if (sortingObj.sortBy === 'name') {
      if (sortingObj.sortHow === "asc") {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase();
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
    
        // names must be equal
        return 0;

      } else {
        const nameA = a.name.toUpperCase(); // ignore upper and lowercase
        const nameB = b.name.toUpperCase();
        if (nameA > nameB) {
          return -1;
        }
        if (nameA < nameB) {
          return 1;
        }

        // names must be equal
        return 0;
      }
    } else if(sortingObj.sortBy === 'phase') {
        return 0
    }
      return 0
  })
  
  const renderProjects = () => {
    return sortedProjects.map(project => (
      <ProjectListItem
        key={project.id}
        {...project}
      />
      ))
  }

  return (
    <section>
      <button onClick={handleClick}>Load Projects</button>
      <h2>Projects</h2>

      <ul className="cards">{renderProjects(finalProjects)}</ul>
    </section>
  );
};

export default ProjectList;