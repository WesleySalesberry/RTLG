import { ProjectCard } from "../Cards/ProjectCard"
import { ProjectCardLayout } from "../Layouts/ProjectCardLayout"
import { UserProjectCard } from "./UserProjectCard"

export const UserProjects = ({ name, projects }) => {

  if(projects.length > 0){
    return (
      <ProjectCardLayout
        title={`${name} has ${projects.length} ${projects.length > 1 ? 'projects' : 'project'} displayed`}
      >
        {
          projects.map(itm => (
            <UserProjectCard
              key={itm._id}
              itm={itm}
            />
          ))
        }
      </ProjectCardLayout>
    )
  }else{
    return (
      <div className="text-center">
        <p>No Current projects</p>
      </div>
    )
  }
}