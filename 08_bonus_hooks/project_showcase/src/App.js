import { useState, useCallback } from "react"
import Header from "./components/navigation/Header";
import { Outlet } from "react-router-dom";
import Notification from "./components/navigation/Notification";

const App = () => {
  // const data = useLoaderData()
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [error, setError] = useState("");
  // const [projects, setProjects] = useState(data);
  const [searchQuery, setSearchQuery] = useState("")
  const [phaseSelected, setPhaseSelected] = useState("All");
  const [editModeProjectId, setEditModeProjectId] = useState(null);
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

  const toggleDarkMode = () => setIsDarkMode(current => !current)

  const setEditingModeId = useCallback((projectId) => {
      setEditModeProjectId(projectId)
  }, [])

  return (
    <div className={isDarkMode ? "App" : "App light"}>
      <Notification error={error} updateError={updateError}/>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      <Outlet context={{ updateError, handlePhaseSelection, handleSearch, editModeProjectId, searchQuery, phaseSelected, setEditingModeId }}/>
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
