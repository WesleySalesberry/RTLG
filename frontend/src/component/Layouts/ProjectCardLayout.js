import Container from "react-bootstrap/esm/Container"
import Row from "react-bootstrap/esm/Row"
import { ProjectSorting } from "../Projects/ProjectSorting"

export const ProjectCardLayout = ({ children, title }) => {
  return (
    <div className=" my-5 isotope">
      <h3 className="text-center my-3">{ title }</h3>
      {/* <ProjectSorting /> */}
      <Row sm={1} md={2} className="d-flex justify-content-center align-items-center">
        { children }
      </Row>
    </div>
  )
}