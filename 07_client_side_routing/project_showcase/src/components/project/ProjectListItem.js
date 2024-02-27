import { Link } from "react-router-dom";

const ProjectListItem = ({ id, image, name, link }) => {

  return (
    <li className="card">
      <figure className="image">
        <img src={image} alt={name} />
      </figure>

      <section className="details">
        <Link to={`/projects/${id}`}><h4>{name}</h4></Link>
        {link ? (
          <p>
            <a href={link}>Link</a>
          </p>
        ) : null}
      </section>
    </li>
  );
}

export default ProjectListItem;
