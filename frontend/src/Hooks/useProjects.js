import { useState } from "react"
import Project from "../api/Project"

export const useGetProjects = (language="") => {
  const [ error, setError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(null)
  const [ project, setProject ] = useState([])

  const getProjects = async (id) => {
    setIsLoading(true);

    const data = await Project.project.allProjects(language)

    if(data.success === true){
      setProject(data.data)
      
    }else{
      setError(data.message)
      
    }
    setIsLoading(false)
  }

  return { getProjects, project, isLoading, error }
}