import { FaExternalLinkAlt } from "react-icons/fa";

export const ProjectBackground = ({ project }) => {
  return (
     <section className="single-col-max-width py-5 px-4 mx-auto">
      <div className="section-row">
        <div className="mb-5"><img className="img-fluid rounded" src={project.image} alt=""/></div>
        <h3 className="section-title">Project Background</h3>
        <p>{project.description}</p>

        <div className="mb-5">
          <a className="btn btn-primary" href="" target="_blank">
            <FaExternalLinkAlt className="me-2 mb-1"/>
             View Live Site
          </a>
        </div>
      </div>
     </section>
  )
}