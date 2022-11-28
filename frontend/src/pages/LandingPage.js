import { useContext } from "react";
import { Projects } from "../component/Display/TopProjects";
import { BaseLayout } from "../component/Layouts/BaseLayout";
import { Meta } from "../component/Meta";

export const LandingPage = () => {

  return (
    <BaseLayout>
      <Meta />
      <div className="showcase rounded">
        <div>
          <h2>Welcome to Real Light House Guild</h2>
          <p>A place for students to display their work</p>
        </div>
      </div>
      <Projects />
    </BaseLayout>
  )
}