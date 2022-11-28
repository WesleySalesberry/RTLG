import Navbar from 'react-bootstrap/Navbar';

import { useTokenContext } from '../../Hooks/useTokenContext';
import { NoUserNav } from './NoUserNav';
import { UserNav } from './UserNav';

export const HeaderBar = () => {
  const { isAuthenticated } = useTokenContext()
  
  return (
    <Navbar bg="light" expand="lg" rounded>
      {
        isAuthenticated ? 
          <UserNav />
        :
          <NoUserNav />
      }
    </Navbar>
  )
}