import { BaseLayout } from "../Layouts/BaseLayout"
import { ProjectBackground } from "./ProjectBackground"
import { useGetProject } from '../../Hooks/useProject'
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ProjectChallenges } from "./ProjectChallenges";
import { ProjectContact } from "./ProjectContact";
import { ProjectTech } from "./ProjectTech";
import { FaAngleLeft } from "react-icons/fa"

export const ProjectMain = () => {
  const navigate = useNavigate();
  const { id } = useLocation().state

  const { getProject, project, isLoading, error } = useGetProject();

  useEffect(() => {
    getProject(id);
  }, [])

  if(!isLoading){
    return (
      <BaseLayout>
        <div className="mr-3 my-4" onClick={() => navigate(-1)}>
          <span className="btn btn-primary">
            <FaAngleLeft className="me-1 mb-1"/>
            Go Back
          </span>
        </div>
        <ProjectBackground
          project={project} 
        />
        <ProjectChallenges
          challenges={project.challenges}
          actions={project.actions} 
        />
        <ProjectTech
          tech={project.language}
        />
        <ProjectContact
          student={project.student} 
        />
      </BaseLayout>
    )
  }else if(isLoading){
    return (
      <p>Loading..</p>
    )
  }else{
    <p>{error}</p>
  }

  
}