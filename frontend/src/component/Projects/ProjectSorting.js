import { useContext, useEffect, useState } from "react"
import Container from "react-bootstrap/esm/Container"
import { LanguageContext } from "../../Context/LanguageContext"
import { useGetProjects } from "../../Hooks/useProjects"
import { capitalizeFirstLetter } from "../../utils/helpers"

export const ProjectSorting = () => {
  const { getProjects, project, isLoading, error } = useGetProjects()
  const { setLanguage } = useContext(LanguageContext)

  const [activeId, setActiveId] = useState(0);

  useEffect(() => {
    getProjects()
  }, [])

  const getProject = async (lang, id) => {
    setActiveId(id)
    setLanguage(lang)
  }

  const languages = project.map((itm) => itm.language)
                      .flat(1)
                      .filter((value, index, self) => self.indexOf(value) === index).sort();

  return (
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
                key={idx}
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
    </section>
  )
}