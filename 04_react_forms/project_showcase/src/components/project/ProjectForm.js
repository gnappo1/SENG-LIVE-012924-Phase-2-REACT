import { useState } from "react";
import { object, string } from 'yup';
import { Formik } from 'formik';


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
  const [serverError, setServerError] = useState("");

  const handleAddProject = (newProject, setSubmitting, resetForm) => {
    //! Optimistically add the project to the UI
    //! aka update the projects state array which will cause a rerender and update the UI
    addProject(newProject)
    //! Fire the http POST request to your json-server
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newProject)
    })
    .then(resp => {
      if (!resp.ok) {
        //! Throw a hardcoded error for the time being
        //! When we will build our own servers you'll send back to the frontend (react) all sorts of errors
        throw new Error("Failed to fetch because server is not running")
      }
      //! Unlock the submit button
      setSubmitting(false)
      //! Reset the form
      resetForm()
    })
    .catch(err => {
      //! Display the error text (remember it's an object) 
      setServerError(err.text)
      //! Set the logic to clear the error after 5 seconds
      setTimeout(() => setServerError(""), 5000)
      //! Unlock the submit button
      setSubmitting(false)
      //! Remove the project from the UI
      removeLastProject()
    })
  }

  return (
    <section>
      {serverError ? <p className="error-message red">{serverError}</p> : null}
      <Formik
        initialValues={initialState}
        validationSchema={projectSchema}
        onSubmit={(values, {setSubmitting, resetForm, ...rest}) => {
          console.log("🚀 ~ ProjectForm ~ rest:", rest)
          handleAddProject(values, setSubmitting, resetForm)
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
          /* and other goodies */
        }) => (
          <form className="form" autoComplete="off" onSubmit={handleSubmit}>
          <h3>Add New Project</h3>

          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={values.name} onChange={handleChange} onBlur={handleBlur}/>
          {errors && errors.name && touched.name && <p className='red-text bold center'>{errors.name}</p>}
          <label htmlFor="about">About</label>
          <textarea id="about" name="about" value={values.about}  onChange={handleChange}  onBlur={handleBlur}/>
          {errors && errors.about && touched.about && <p className='red-text bold center'>{errors.about}</p>}
          <label htmlFor="phase">Phase</label>
          <select name="phase" id="phase" value={values.phase} onChange={handleChange} onBlur={handleBlur}>
            <option value="">Select One</option>
            <option value="1">Phase 1</option>
            <option value="2">Phase 2</option>
            <option value="3">Phase 3</option>
            <option value="4">Phase 4</option>
            <option value="5">Phase 5</option>
          </select>
          {errors && errors.phase && touched.phase && <p className='red-text bold center'>{errors.phase}</p>}
          <label htmlFor="link">Project Homepage</label>
          <input type="text" id="link" name="link" value={values.link} onChange={handleChange}  onBlur={handleBlur}/>
          {errors && errors.link && touched.link && <p className='red-text bold center'>{errors.link}</p>}
          <label htmlFor="image">Screenshot</label>
          <input type="text" id="image" name="image" value={values.image} onChange={handleChange}  onBlur={handleBlur}/>
          {errors && errors.image && touched.image && <p className='red-text bold center'>{errors.image}</p>}
          <button type="submit" disabled={isSubmitting}>Add Project</button>
        </form>
        )}
      </Formik>
    </section>
  );
};

export default ProjectForm;
