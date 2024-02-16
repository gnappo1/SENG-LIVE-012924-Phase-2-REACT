import React from 'react'
import ProjectItem from './ProjectItem'

const ProjectList = (props) => {
    const {projects} = props // object destructuring
    // debugger
    const mappedProjects = projects.map(projectObj => <ProjectItem projectObj={projectObj} key={projectObj.id}/>)

    return (
        <div>{mappedProjects}</div>
    )
}

export default ProjectList