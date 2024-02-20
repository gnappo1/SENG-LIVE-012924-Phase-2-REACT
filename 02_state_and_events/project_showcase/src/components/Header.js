import React from "react";

const Header = ({ toggleDarkMode, isDark }) => {
  const btnText = isDark ? "Light" : "Dark"
  
  return (
    <header>
      <h1>
        <span className="logo">{"//"}</span>
        Project Showcase
      </h1>
      <button onClick={toggleDarkMode}>{btnText} Mode</button>
    </header>
  );
}

export default Header;
