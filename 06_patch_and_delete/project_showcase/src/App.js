import { useState, useEffect } from "react"
import Header from "./components/navigation/Header";
import ProjectForm from "./components/project/ProjectForm";
import ProjectList from "./components/project/ProjectList";
import SearchBar from "./components/search/SearchBar";
import ButtonsFilter from "./components/search/ButtonsFilter";
import { v4 as uuidv4 } from "uuid"

const URL = 'http://localhost:4000/projects'

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState("")
  const [phaseSelected, setPhaseSelected] = useState("All");
  const [idEditingMode, setIdEditingMode] = useState(0);
  
  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:4000/projects`)
        const data = await response.json()
        setProjects(data);
      } catch (error) {
        alert(error)
      }
    })()
  }, [])
  
  const handlePhaseSelection = (e) => {
    if (e.target.textContent === "All") {
      setPhaseSelected("All")
    } else {
      const phase = e.target.textContent.slice(-1)
      setPhaseSelected(Number(phase))
    }
  }

  const handleChangeEditingMode = (value) => {
    setIdEditingMode(value)
  }

  const handleUnswapProject = (originalProjectObj) => {
    setProjects(mostCurrentProjects => mostCurrentProjects.map(project => project.id === originalProjectObj.id ? originalProjectObj : project))
  }

  const handleSearch = (e) => {
      setSearchQuery(e.target.value)
  }

  const handleAddProject = (newProject) => {
    setProjects(currentProjects => {
      const lastProjectArray = currentProjects.slice(-1)
      const id = lastProjectArray.length ? Number(lastProjectArray[0].id) + 1 : uuidv4()
      return [...currentProjects, { ...newProject, id }]
    })
  }

  const handleDeleteProject = (idOfElementToRemove) => {
    const projectToRemove = projects.find(project => project.id === idOfElementToRemove)
    //! Optimistic update:
    //! Update the UI
    setProjects(currentProjectList => currentProjectList.filter(project => project.id !== idOfElementToRemove))
    //! Update the server
    fetch(`${URL}/${idOfElementToRemove}`, {method: "DELETE"})
    .then(resp => {
      if (!resp.ok) {
        throw new Error('something went wrong when updating the server!')
      }
    })
    .catch(err => {
      alert(err)
      setProjects(currentProjects => [...currentProjects, projectToRemove])
    })

  }

  const handleEditProject = (projectToUpdate) => {
    setProjects(mostCurrentProjects => mostCurrentProjects.map(project => project.id === projectToUpdate.id ? projectToUpdate : project))
  }

  const toggleDarkMode = () => setIsDarkMode(current => !current)


  return (
    <div className={isDarkMode ? "App" : "App light"}>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      <ProjectForm handleAddProject={handleAddProject} idEditingMode={idEditingMode} handleEditProject={handleEditProject} handleChangeEditingMode={handleChangeEditingMode} handleUnswapProject={handleUnswapProject }/>
      <ButtonsFilter handlePhaseSelection={handlePhaseSelection}/>
      <SearchBar handleSearch={handleSearch} searchQuery={searchQuery} />
      <ProjectList projects={projects} searchQuery={searchQuery} phaseSelected={phaseSelected} handleDeleteProject={handleDeleteProject} handleChangeEditingMode={handleChangeEditingMode }/>

    </div>
  );
};

export default App;
