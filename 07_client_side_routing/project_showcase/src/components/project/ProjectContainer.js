import React from 'react'
import ButtonsFilter from '../search/ButtonsFilter'
import SearchBar from '../search/SearchBar'
import ProjectList from './ProjectList'
import { useOutletContext } from 'react-router-dom'

const ProjectContainer = () => {
    const { handlePhaseSelection, handleSearch, projects, searchQuery, phaseSelected, setEditingModeId, handleDelete } = useOutletContext()
  return (
    <div>
        <ButtonsFilter handlePhaseSelection={handlePhaseSelection} />
        <SearchBar handleSearch={handleSearch} searchQuery={searchQuery} />
        <ProjectList projects={projects} searchQuery={searchQuery} phaseSelected={phaseSelected} setEditingModeId={setEditingModeId} handleDelete={handleDelete} />

    </div>
  )
}

export default ProjectContainer