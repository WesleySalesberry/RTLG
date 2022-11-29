import { useState } from "react"
import { useNavigate } from "react-router-dom"
import User from "../api/User";

export const useUpdateUser = () => {
  const navigate = useNavigate();
  const [ message, setMessage ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(null);

  const updateUser = async (body) => {
    setIsLoading(true)
    const data = await User.privateUser.updateUser(body)

    console.log(data)

    if(data.success === true){
      setMessage()
    }else{
      setError()
    }

    setIsLoading(false)
  } 


  return { updateUser, message, error, isLoading }
}