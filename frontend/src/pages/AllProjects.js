import { AllProjects } from "../component/Display/AllProjects";
import { BaseLayout } from "../component/Layouts/BaseLayout";
import { ProjectMain } from "../component/Projects/ProjectsMain";

export const AllProjectsPage = () => {
  return (
    <BaseLayout>
      <ProjectMain />
    </BaseLayout>
  )
}