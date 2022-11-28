import { TokenContext } from "../Context/TokenContext";
import { useContext } from "react";


export const useTokenContext = () => {
  const context = useContext(TokenContext)

  if(!context) {
    throw Error('useTokenContext must be used inside an TokenContext Provider')
  }
  return context;
}