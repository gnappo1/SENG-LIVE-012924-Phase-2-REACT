import { useState, useEffect, useContext, useRef } from "react";
import {object, string} from "yup"
import { useOutletContext, useNavigate, useParams } from "react-router-dom";
import { ProjectsContext } from '../../context/ProjectsProvider'

const initialState = {
  name: "",
  about: "",
  phase: "",
  link: "",
  image: "",
}

const URL = "http://localhost:4000/projects"

const ProjectForm = () => {

  const [formData, setFormData] = useState(initialState)
  const { handleAddProject, handlePatchProject } = useContext(ProjectsContext)
  const {updateError, setEditingModeId } = useOutletContext()
  const navigate = useNavigate()
  const initialVersionOfProject = useRef({})
  const { projectId } = useParams()

  useEffect(() => {
    if (projectId) {
      fetch(`http://localhost:4000/projects/${projectId}`)
      .then(resp => resp.json())
      .then(data => {
        initialVersionOfProject.current = data
        setFormData(data)
      })
      .catch(err => {
        updateError(err.message)
        navigate("/projects")
      })
    }
  }, [projectId, updateError, navigate]);

  const projectSchema = object({
    name: string().required("Name is required!"),
    about: string().required("About is required!"),
    phase: string().required("Phase is required!"),
    link: string().required("Link is required!"),
    image: string().required("Image is required!"),
  })

  const handleChange = ({target: {name, value}}) => {
    setFormData(currentFormData => {
      return {
        ...currentFormData,
        [name]: value
      }
    })
  }

  const handleSubmit = (e) => {
    //! 1. NO PAGE REFRESHES EVEEEEEEEER (preventDefault)
    e.preventDefault()

    projectSchema
    .validate(formData)
    .then(validFormData => {
      // if (editModeProjectId) {
      const url = `${URL}/${projectId || ""}`
      const method = projectId ? "PATCH" : "POST"
        fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json" 
          },
          body: JSON.stringify(validFormData)
        })
        .then(resp => resp.json())
        .then(projectFromDb => {
          if (projectId) {
            //! 4. Fire a PATCH fetch call that on success will call a helper function that would send the updated obj to our collection
              handlePatchProject(projectFromDb) 
              //! 5. Reset back to POST creation mode
              setEditingModeId(null)
          } else {
            handleAddProject(projectFromDb)
          } 
          //! 6. Reset the form IN CASE OF A SUCCESS
          // setFormData(initialState)
        })
        .then(() => navigate("/projects"))
        .catch(err => alert(err))
    })
    .catch(validationError => {
      alert(validationError.message)
    })
  }

  return (
    <section>
      <form className="form" autoComplete="off" onSubmit={handleSubmit}>
        <h3>{projectId ? "Update Project" : "Add New Project"}</h3>

        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange}/>

        <label htmlFor="about">About</label>
        <textarea id="about" name="about"  value={formData.about} onChange={handleChange}/>

        <label htmlFor="phase">Phase</label>
        <select name="phase" id="phase" value={formData.phase} onChange={handleChange}>
          <option>Select One</option>
          <option value="1">Phase 1</option>
          <option value="2">Phase 2</option>
          <option value="3">Phase 3</option>
          <option value="4">Phase 4</option>
          <option value="5">Phase 5</option>
        </select>

        <label htmlFor="link">Project Homepage</label>
        <input type="text" id="link" name="link"  value={formData.link} onChange={handleChange}/>

        <label htmlFor="image">Screenshot</label>
        <input type="text" id="image" name="image"  value={formData.image} onChange={handleChange}/>

        <button type="submit">{projectId ? "Update" : "Create"}</button>
      </form>
    </section>
  );
};

export default ProjectForm;
