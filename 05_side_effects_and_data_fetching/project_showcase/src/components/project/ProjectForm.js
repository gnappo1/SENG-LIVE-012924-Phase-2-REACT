import { useState } from "react";
import { object, string } from 'yup';


const initialState = {
  name: "",
  about: "",
  phase: "",
  link: "",
  image: ""
}

const url = "http://localhost:4000/projects"

const projectSchema = object().shape({
  name: string().required('Name is required!'),
  about: string().required('About is required!'),
  phase: string().required('Phase is required!'),
  link: string().required('Link is required!'),
  image: string().required('Image is required!')
})

const ProjectForm = ({ addProject, removeLastProject }) => {
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    //! Validate data before sending it ANYWHERE
    // const newProjectValues = Object.values(formData)
    // const invalidData = () => newProjectValues.some(value => !value.trim())
    // if (invalidData()) {
    //   setError("Values cannot be blank!")
    //   return
    // }

    //! Validate with yup
    projectSchema.validate(formData)
      .then(validFormData => {
        addProject(validFormData)
        //! We need to talk to the server
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        })
          .then(resp => {
            if (!resp.ok) {
              throw new Error("Failed to fetch because server is not running")
            }
            setFormData(initialState)
          })
          .catch(err => {
            setError(err.text)
            setTimeout(() => setError(""), 5000)
            removeLastProject()
          })
      })
      .catch(validationError => setError(validationError.message))
    //! Optimistic rendering
    //! Put the new project onto the page

  }

  return (
    <section>
      {error ? <p className="error-message red">{error}</p> : null}
      <form className="form" autoComplete="off" onChange={handleChange} onSubmit={handleSubmit}>
        <h3>Add New Project</h3>

        <label htmlFor="name">Name</label>
        <input type="text" id="name" name="name" value={formData.name} />

        <label htmlFor="about">About</label>
        <textarea id="about" name="about" value={formData.about} />

        <label htmlFor="phase">Phase</label>
        <select name="phase" id="phase" value={formData.phase}  >
          <option value="">Select One</option>
          <option value="1">Phase 1</option>
          <option value="2">Phase 2</option>
          <option value="3">Phase 3</option>
          <option value="4">Phase 4</option>
          <option value="5">Phase 5</option>
        </select>

        <label htmlFor="link">Project Homepage</label>
        <input type="text" id="link" name="link" value={formData.link} />

        <label htmlFor="image">Screenshot</label>
        <input type="text" id="image" name="image" value={formData.image} />

        <button type="submit">Add Project</button>
      </form>
    </section>
  );
};

export default ProjectForm;