import Container from 'react-bootstrap/esm/Container';
import Navbar from 'react-bootstrap/esm/Navbar';
import Nav from 'react-bootstrap/Nav';
import { LinkContainer } from 'react-router-bootstrap'


export const NoUserNav = () => {
  return (
    <Container>
      <LinkContainer to="/">
        <Navbar.Brand>RTLG</Navbar.Brand>
      </LinkContainer>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ms-auto">
          <LinkContainer to="/all-projects">
            <Nav.Link>
              Projects
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/login">
            <Nav.Link>
              Login/Register
            </Nav.Link>
          </LinkContainer>
        </Nav>
        </Navbar.Collapse>
    </Container>
  )
}