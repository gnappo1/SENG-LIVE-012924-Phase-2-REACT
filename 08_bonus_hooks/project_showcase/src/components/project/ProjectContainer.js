import React, { useContext } from 'react'
import ButtonsFilter from '../search/ButtonsFilter'
import SearchBar from '../search/SearchBar'
import ProjectList from './ProjectList'
import { ProjectsContext } from '../../context/ProjectsProvider'
import { useOutletContext } from 'react-router-dom'

const ProjectContainer = () => {
    const {projects, handleDelete} = useContext(ProjectsContext)
    const { handlePhaseSelection, handleSearch, searchQuery, phaseSelected, setEditingModeId } = useOutletContext()
  return (
    <div>
        <ButtonsFilter handlePhaseSelection={handlePhaseSelection} />
        <SearchBar handleSearch={handleSearch} searchQuery={searchQuery} />
        <ProjectList projects={projects} searchQuery={searchQuery} phaseSelected={phaseSelected} setEditingModeId={setEditingModeId} handleDelete={handleDelete} />

    </div>
  )
}

export default ProjectContainer