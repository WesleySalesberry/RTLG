import { useContext, useEffect } from "react"

import { ProjectCardLayout } from "../Layouts/ProjectCardLayout"
import { ProjectCard } from "../Cards/ProjectCard"
import { LanguageContext } from "../../Context/LanguageContext"
import { useGetProjects } from "../../Hooks/useProjects"
import { ProjectSorting } from "./ProjectSorting"

export const Projects = () => {
  const { language } = useContext(LanguageContext)
  const { getProjects, project, isLoading } = useGetProjects(language)

  useEffect(() => {
    getProjects();
  }, [ language ])

  if(!isLoading){
    return (
      <ProjectCardLayout
        title="All Projects"
      >
        <ProjectSorting />
        {
          project.map(itm => (
            <ProjectCard
              itm={itm} 
            />
          ))
        }
      </ProjectCardLayout>
    )
  }else{
    return (
      <p>Loading...</p>
    )
  }

  
}