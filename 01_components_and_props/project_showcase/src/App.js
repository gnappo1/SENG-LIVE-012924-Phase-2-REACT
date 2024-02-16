import Header from "./Header"
import ProjectList from "./ProjectList"
import {projects as projectList} from "./projects"

console.log("🚀 ~ file: App.js:3 ~ projects:", projectList)

const App = () => {

  return (
    <div className="app-div">
      <Header />
      <ProjectList projects={projectList}/>
    </div>
  )
}

export default App