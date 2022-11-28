import Container from "react-bootstrap/esm/Container"
import { HeaderBar } from "../NavComponents/Nav"

export const BaseLayout = ({ children }) => {
  return (
    <Container fluid>
      <HeaderBar />
      { children }
    </Container>
  )
}