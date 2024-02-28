import { useState, useEffect } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa"
import { useOutletContext, useParams, useNavigate } from "react-router-dom";
const url = 'http://localhost:4000/projects/'

const ProjectDetails = () => {
    // const {image, name, link, about, phase} = project
    const [clapCount, setClapCount] = useState(0);
    const [projectDetails, setProjectDetails] = useState(null);
    const { projectId } = useParams()
    const navigate = useNavigate()
    const { setEditingModeId, handleDelete, updateError } = useOutletContext()

    useEffect(() => {
        fetch(url + projectId)
        .then(res => res.json())
        .then(setProjectDetails)
        .catch(error => updateError(error.message))
    }, [projectId, updateError]);
    
    const handleClap = () => setClapCount(clapCount + 1);

    if (!projectDetails) {
        return <h2>Loading...</h2>
    }

    const { id, image, name, link, about, phase } = projectDetails
    return (
        <li className="card">
            <figure className="image">
                <img src={image} alt={name} />
                <button className="claps" onClick={handleClap}>
                    👏{clapCount}
                </button>
            </figure>

            <section className="details">
                <h4>{name}</h4>
                <p>{about}</p>
                {link ? (
                    <p>
                        <a href={link}>Link</a>
                    </p>
                ) : null}
            </section>

            <footer className="extra">
                <span className="badge blue">Phase {phase}</span>
                <div className="manage">
                    <button onClick={() => {
                        setEditingModeId(id)
                        navigate(`/projects/${id}/edit`)
                    }}><FaPencilAlt /></button>
                    <button onClick={() => handleDelete(id)}><FaTrash /></button>
                </div>
            </footer>
        </li>
    );
}

export default ProjectDetails;
