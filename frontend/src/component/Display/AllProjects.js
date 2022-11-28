import { useState, useEffect } from "react"

import { ProjectCardLayout } from "../Layouts/ProjectCardLayout"
import { ProjectCard } from "../Cards/ProjectCard"

import Project from '../../api/Project'

export const AllProjects = () => {
  const [ projects, setProjects ] = useState()

  const getProjects = async () => {
    const projects = await Project.project.allProjects();
    setProjects(projects.data)
  }

  useEffect(() => {
    getProjects()
  }, [])

  if(projects){
    return (
    <ProjectCardLayout
      title="All Projects"
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
  }else{
    return (
      <div className="text-center my-3">
        <h2>No Projects to display</h2>
      </div>
    )
  }
}