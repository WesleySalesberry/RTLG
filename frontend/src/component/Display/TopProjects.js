import { useState, useEffect } from "react"

import { ProjectCardLayout } from "../Layouts/ProjectCardLayout"
import Project from '../../api/Project'
import { ProjectCard } from "../Cards/ProjectCard"

export const Projects = () => {
  const [ projects, setProjects ] = useState()

  const getProjects = async () => {
    const projects = await Project.project.topProjects();
    setProjects(projects.data)
  }

  useEffect(() => {
    getProjects()
  }, [])


  if(projects){
    return (
      <ProjectCardLayout
        title="Top Rated Projects"
      >
        { 
            projects && projects.map(itm => (
              <ProjectCard
                key={itm._id} 
                itm={itm}
              />
            ))
        }
      </ProjectCardLayout>
    )
  }else {
    return (
    <div className="text-center my-3">
      <h2>No Projects to display</h2>
    </div>
    )
  }
}