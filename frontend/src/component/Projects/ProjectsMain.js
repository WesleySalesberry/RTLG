import { useContext, useState, useEffect } from "react"
import Container from "react-bootstrap/esm/Container"
import { useGetProjects } from "../../Hooks/useProjects"
import { LanguageContext } from "../../Context/LanguageContext"
import { capitalizeFirstLetter } from "../../utils/helpers"
import { ProjectCardLayout } from "../Layouts/ProjectCardLayout"
import { ProjectCard } from "../Cards/ProjectCard"
import { Projects } from "./Projects"
import { ProjectSorting } from "./ProjectSorting"

export const ProjectMain = () => {
  const [activeId, setActiveId] = useState(0);
  const [language, setLanguage] = useState('');

  const { getProjects, project, isLoading } = useGetProjects(language)

  const getProject = async (lang, id) => {
    setActiveId(id)
    setLanguage(lang)
  }

  const languages = project.map((itm) => itm.language)
                      .flat(1)
                      .filter((value, index, self) => self.indexOf(value) === index).sort();

  useEffect(() => {
    getProjects()
  }, [language])

  const title = language === '' ? "All" : capitalizeFirstLetter(language) 
  if(project){
    return <p>Nothing to display</p>
  }else{
    return (
      <Container className="border rounded shadow my-5">
        <h3 className="text-center my-3">{ title } Projects</h3>
        <section className="projects-list px-3 py-5 p-md-5">
          <Container>
            <div className="text-center">
              <ul id="filters" className="filters mb-5 mx-auto ps-0">
                <li
                  className={`type ${activeId === 0 ? 'active' : ''} mb-3 mb-lg-0`}
                  onClick={() => getProject('', 0)}
                >
                  All
                </li>
                {
                  languages.map((itm, idx) => (
                    <li
                    key={idx+1}
                    className={`type ${activeId === idx+1 ? 'active' : ''} mb-3 mb-lg-0`}
                    onClick={() => getProject(itm, idx+1)}
                  >
                    { capitalizeFirstLetter(itm) }
                  </li>
                  ))
                }
              </ul>
            </div>
          </Container>
          <ProjectCardLayout>
            {
              project.map(itm => (
                <ProjectCard
                  key={itm._id}
                  itm={itm} 
                />
              ))
            }
          </ProjectCardLayout>
        </section>
      </Container>
    )
  }
}