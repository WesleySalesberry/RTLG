import { useState } from "react"
import { useNavigate } from "react-router-dom"
import User from "../api/User";

export const useUpdateUser = () => {
  const navigate = useNavigate();
  const [ message, setMessage ] = useState(null);
  const [ error, setError ] = useState(null);
  const [ isLoading, setIsLoading ] = useState(null);

  const updateUser = async (body, img) => {
    setIsLoading(true)
    const data = await User.privateUser.updateUser(body)
    const image = await User.privateUser.updateImage(img)

    console.log(data)
    // console.log(image)

    if(data.success === true){
      setMessage()
    }else{
      setError()
    }

    setIsLoading(false)
  } 


  return { updateUser, message, error, isLoading }
}