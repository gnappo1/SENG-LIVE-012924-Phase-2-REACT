import { useState } from "react"
import Header from "./components/navigation/Header";
import ProjectForm from "./components/project/ProjectForm";
import ProjectList from "./components/project/ProjectList";
import PhaseSelector from "./components/filters/PhaseSelector";
import SearchBar from "./components/filters/SearchBar";
import Sorting from "./components/filters/Sorting";

const App = () => {
  //! LOCAL STATE
  //! the hook returns an array with ALWAYS two elements
  //! the ONLY WAY TO UPDATE the state variable is by using the state function
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("")
  const [phaseSelected, setPhaseSelected] = useState("All");
  const [sortingObj, setSortingObj] = useState({
    sortBy: "",
    sortHow: "asc"
  })

  const handleUpdateSort = (e) => {
    setSortingObj({
      ...sortingObj,
      [e.target.name]: e.target.value
    })
  }

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
  //! LOCAL NON-STATE VARIABLES DO NOT CAUSE RE-RENDERS
  // let count = 0

  const toggleDarkMode = () => setIsDarkMode(!isDarkMode)

  return (
    <div className={isDarkMode ? "App" : "App light"}>
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <ProjectForm />
      <PhaseSelector handlePhaseSelection={ handlePhaseSelection }/>
      <Sorting handleUpdateSort={handleUpdateSort} sortingObj={sortingObj }/>
      <SearchBar handleSearch={handleSearch} searchQuery={searchQuery}/>
      <ProjectList searchQuery={searchQuery} phaseSelected={phaseSelected} sortingObj={sortingObj} />
    </div>
  );
};

export default App;
