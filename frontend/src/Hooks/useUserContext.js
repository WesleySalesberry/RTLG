import { UserContext } from "../Context/UserContext";
import { useContext } from "react";


export const useUserContext = () => {
  const context = useContext(UserContext)

  if(!context) {
    throw Error('useUserContext must be used inside an UserContext Provider')
  }
  return context;
}