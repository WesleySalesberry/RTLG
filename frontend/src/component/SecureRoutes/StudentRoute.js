import { Navigate } from "react-router-dom";

import jwt_decode from "jwt-decode";

import { getToken, validateToken } from "../../utils/token"
import { useTokenContext } from "../../Hooks/useTokenContext";

export const StudentRoute = ({ children }) => {
  const { token } = useTokenContext();

  

  if(token === null){
    <Navigate to="/login" replace />
  }
  
  if(!validateToken(token)){
    return <Navigate to="/login" replace />
  } 
  
  const decoded = jwt_decode(token);

  if(decoded.role !== "student"){
    return <Navigate to="/login" replace />
  }

  return children

}