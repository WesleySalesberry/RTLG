import { useState } from "react"
import { useNavigate } from 'react-router-dom';

import User from "../api/User"
import { STUDENT, PROFILE } from "../utils/paths";
import { setStorage } from "../utils/token"
import { useTokenContext } from './useTokenContext'


export const useLogin = () => {
  const navigate = useNavigate()
  const [ error, setError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(null)
  const { dispatch } = useTokenContext();

  const login = async (email, password) => {
    const body = {
      email: email,
      hash: password
    }
    setIsLoading(true)
    const data = await User.user.login(body)
    
    if(data.success === true){
      setIsLoading(false)
      //set token to storage
      setStorage('token', data.token)
      //Update the auth context
      dispatch({type: 'LOGIN', payload: data.token }) 
      navigate(`/${STUDENT}/${PROFILE}`)
    }else{
      setIsLoading(false)
      setError(data.message)
      setTimeout(() => {
        setError(null)
      }, 3000)
    }
  }

  return { login, isLoading, error }

}