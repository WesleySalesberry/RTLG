import { Navigate } from "react-router-dom";

import jwt_decode from "jwt-decode";

import { getToken, validateToken } from "../../utils/token"

export const AdminRoute = ({ children }) => {

  const token = getToken();

  if(token === null){
    <Navigate to="/login" replace />
  }

  
  if(!validateToken(token)){
    return <Navigate to="/login" replace />
  }

  const decoded = jwt_decode(token);

  if(decoded.role !== "admin"){
    return <Navigate to="/login" replace />
  }

  return children

}