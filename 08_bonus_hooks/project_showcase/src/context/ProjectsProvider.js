import React, { useState, useEffect, useCallback } from 'react'

export const ProjectsContext = React.createContext()

const ProjectsProvider = ({ children }) => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        (async () => {
            try {
                const response = await fetch(`http://localhost:4000/projects`)
                const data = await response.json()
                setProjects(data)
            } catch (error) {
                alert(error)
            }
        })()
    }, [])

    const handleAddProject = (createdProject) => {
        setProjects(currentProjectList => [createdProject, ...currentProjectList]) //! new state derived based on current state
        // setProjects([createdProject, ...projects])
    }

    const handlePatchProject = (updatedProject) => {
        setProjects(currentProjects => currentProjects.map(project => (
            project.id === updatedProject.id ? updatedProject : project
        )))
    }

    const handleDelete = useCallback((projectToRemove) => {
        setProjects(currentProjects => currentProjects.filter(project => project.id !== projectToRemove.id))
        return fetch(`http://localhost:4000/projects/${projectToRemove.id}`, { method: "DELETE" })
            .catch((err) => {
                alert(err)
                setProjects(current => [...current, projectToRemove])
            })
        // .then(() => navigate("/projects"))
    }, [])

    return (
        <ProjectsContext.Provider value={{ projects , handleAddProject, handleDelete, handlePatchProject}}>
            {children}
        </ProjectsContext.Provider>
    )
}

export default ProjectsProvider