import { useState } from "react"
import Header from "./components/navigation/Header";
import { Outlet, useNavigate, useLoaderData } from "react-router-dom";
import Notification from "./components/navigation/Notification";

const App = () => {
  const data = useLoaderData()
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [error, setError] = useState("");
  const [projects, setProjects] = useState(data);
  const [searchQuery, setSearchQuery] = useState("")
  const [phaseSelected, setPhaseSelected] = useState("All");
  const [editModeProjectId, setEditModeProjectId] = useState(null);
  const navigate = useNavigate()
  const updateError = (err) => setError(err)
  
  const handlePhaseSelection = (e) => {
    if (e.target.textContent === "All") {
      setPhaseSelected("All")
    } else {
      const phase = e.target.textContent.slice(-1)
      setPhaseSelected(Number(phase))
    }
  }

  const handleSearch = (e) => {
      setSearchQuery(e.target.value)
  }

  const handleAddProject = (createdProject) => {
    setProjects(currentProjectList => [createdProject, ...currentProjectList]) //! new state derived based on current state
    // setProjects([createdProject, ...projects])
  }

  const handlePatchProject = (updatedProject) => {
    setProjects(currentProjects => currentProjects.map(project => (
      project.id === updatedProject.id ? updatedProject : project
    )))
  }

  const handleDelete = (projectId) => {
    fetch(`http://localhost:4000/projects/${projectId}`, {method: "DELETE"})
    .then(() => {
      setProjects(currentProjects => currentProjects.filter(project => project.id !== projectId))
      navigate("/projects")
    })
    // .then(() => navigate("/projects"))
  }

  const toggleDarkMode = () => setIsDarkMode(current => !current)

  const setEditingModeId = (projectId) => {
      setEditModeProjectId(projectId)
  }

  return (
    <div className={isDarkMode ? "App" : "App light"}>
      <Notification error={error} updateError={updateError}/>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      <Outlet context={{ updateError, handlePhaseSelection, handleSearch, handleAddProject, handlePatchProject, editModeProjectId, projects, searchQuery, phaseSelected, setEditingModeId, handleDelete }}/>
    </div>
  );
};

export default App;

export const projectsLoader = async () => {
  try {
    const response = await fetch(`http://localhost:4000/projects`)
    return await response.json()
  } catch (error) {
    return error
  }
}
