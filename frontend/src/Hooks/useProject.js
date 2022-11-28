import { useState } from "react"
import Project from "../api/Project"

export const useGetProject = () => {
  const [ error, setError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(null)
  const [ project, setProject ] = useState([])

  const getProject = async (id) => {
    setIsLoading(true);

    const data = await Project.project.singleProject(id)

    if(data.success === true){
      setProject(data.data)
      
    }else{
      setError(data.message)
      
    }
    setIsLoading(false)
  }

  return { getProject, project, isLoading, error }

}