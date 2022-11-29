import { useNavigate } from 'react-router-dom';

import { useState } from "react"
import User from "../api/User"
import { LOGIN } from '../utils/paths';

export const useDeleteUser = () => {
  const navigate = useNavigate();
  const [ message, setMessage ] = useState('')
  const [ error, setError ] = useState(null)
  const [ isLoading, setIsLoading ] = useState(null)
  

  const deleteUser = async (id) => {
    setIsLoading(true);

    const data = await User.privateUser.deleteUser()
    console.log(data)
    if(data.success === true){
      setMessage(data.data)
      navigate(`/${LOGIN}`);
    }else{
      setError(data.message)
    }
    setIsLoading(false)
  }

  return { deleteUser, isLoading, error }
}