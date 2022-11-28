import { useTokenContext } from './useTokenContext'

export const useLogout = () => {
  const { dispatch } = useTokenContext();
  
  const logout = () => {
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('token')

    dispatch({ type: 'LOGOUT'})
  }

  return {logout};
}