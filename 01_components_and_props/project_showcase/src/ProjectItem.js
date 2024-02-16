import React from 'react'

const ProjectItem = ({projectObj}) => {

  return (
      <li className='card'>
        <figure className='image'>
            <img src={projectObj.image} alt={projectObj.about}/>
            <button className='claps'>👏{0}</button>
        </figure>
        <section className='details'>
            <h4>{projectObj.name}</h4>
            <p>{projectObj.about}</p>
            {projectObj.link ? (
                  <p><a href={projectObj.link}>Link</a></p>
            ) : null}
        </section>
        <footer className='extra'>
            <span className='badge blue'>Phase {projectObj.phase}</span>
        </footer>
    </li>
  )
}

export default ProjectItem