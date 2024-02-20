import Header from "./components/Header";
import ProjectForm from "./components/ProjectForm";
import ProjectList from "./components/ProjectList";
import "./index.css"
import projects from "./projects";
import { useState } from "react";

const App = () => {
  const [isDark, setIsDark] = useState(true);

  const toggleDarkMode = () => {
    //! This is a callback prop created by App in order to have control over how the state changes
    // setIsDark(!isDark) //! used when we don't care about the current value to calculate the new one
    setIsDark(currentVal => !currentVal) //! used when I need to calculate the new state val based on the prev/current
  }

  return (
    <div className={isDark ? "App" : "App light"}>
      <Header toggleDarkMode={toggleDarkMode} isDark={isDark}/>
      <ProjectForm />
      <ProjectList projects={projects} />
    </div>
  );
};

export default App;
