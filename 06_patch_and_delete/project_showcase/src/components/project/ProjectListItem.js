import { useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa"

const ProjectListItem = ({ id, image, name, link, about, phase }) => {
  // const {image, name, link, about, phase} = project
  const [clapCount, setClapCount] = useState(0);

  const handleClap = () => setClapCount(current => current + 1);

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
          <button onClick={() => /* do something */ null}><FaPencilAlt /></button>
          <button onClick={() => /* do something */ null}><FaTrash /></button>
        </div>
      </footer>
    </li>
  );
}

export default ProjectListItem;
