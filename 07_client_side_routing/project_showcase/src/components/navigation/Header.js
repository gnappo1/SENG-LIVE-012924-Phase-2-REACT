import { Link, NavLink } from "react-router-dom";

const Header = ({isDarkMode, onToggleDarkMode}) => {
  return (
    <header>
      <h1>
        <span className="logo">{"//"}</span>
        Project Showcase
      </h1>
      <Link to='/'>Home</Link>
      <Link to='/projects'>Projects</Link>
      <Link to='/projects/new'>New Project</Link>
      <button onClick={onToggleDarkMode}>{isDarkMode ? "Light Mode" : "Dark Mode"}</button>
    </header>
  );
}

export default Header;