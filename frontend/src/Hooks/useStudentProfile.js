import { useState } from "react";
import User from "../api/User";
import { setStorage } from "../utils/token";
import { useUserContext } from "./useUserContext";

export const useStudentProfile = () => {
  const [ error, setError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)
  const { dispatch } = useUserContext();

  const studentProfile = async () => {
    setIsLoading(true)

    const data = await User.privateUser.userProfile()

    if(data.success === true){
      setStorage('user', data.data)
      dispatch({ type: 'PROFILE', payload: data.data})
    }else{
      setError(data.message)
    }

    setIsLoading(false)
  }

  return { studentProfile, isLoading, error }
}