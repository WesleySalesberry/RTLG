import { useState } from "react"
import Project from "../api/Project"
import { filterLanguages } from "../utils/helpers"

export const useGetLanguages = () => {
  const [ error, setError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(null)
  const [ languages, setLanguages ] = useState([])

  const getLanguages = async () => {
    setIsLoading(true);

    const data = await Project.project.allLanguages()

    if(data.success === true){
      const language = filterLanguages(data.data)
      setLanguages(language)
      
    }else{
      setError(data.message)
    }
    setIsLoading(false)
  }

  return { getLanguages, languages, isLoading, error }
}