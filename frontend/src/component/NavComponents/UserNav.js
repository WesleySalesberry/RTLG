import Container from 'react-bootstrap/esm/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/esm/Navbar';
import { LinkContainer } from 'react-router-bootstrap'

import { useUserContext } from '../../Hooks/useUserContext';
import { useLogout } from '../../Hooks/useLogout';

export const UserNav = () => {
  const { user } = useUserContext();
  const { logout } = useLogout()

  const handleLogout = () => {
    logout();
  }

  return (
    <Container>
      <LinkContainer to="/">
        <Navbar.Brand>RTLG</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <LinkContainer to="/student/profile">
            <Nav.Link>
              Hi, {user&&user.name}
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/all-projects">
            <Nav.Link>
              Projects
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/" onClick={handleLogout}>
            <Nav.Link>
              Logout
            </Nav.Link>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Container>
  )
}