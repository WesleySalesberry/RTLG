import { Route, Routes } from "react-router-dom";
import { RegisterPage } from "./component/Forms/Register";
import { AdminRoute } from "./component/SecureRoutes/AdminRoute";
import { StudentRoute } from "./component/SecureRoutes/StudentRoute";
import { StudentTable } from "./component/Tables/StudentTable";
import { AllProjectsPage } from "./pages/AllProjects";

import { LandingPage } from './pages/LandingPage'
import { LoginPage } from "./pages/LoginPage";
import { UserPage } from "./pages/private/UserPage";
import { UserUpdatePage } from "./pages/private/UserUpdatePage";
import { ProfilePage } from "./pages/ProfilePage";
import { ProjectPage } from "./pages/Project";
import { LOGIN, PROFILE, PROJECT, REGISTER, STUDENT, UPDATE } from "./utils/paths";

function App() {
  return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path={`/${LOGIN}`} element={<LoginPage />} />
        <Route path={`/${REGISTER}`} element={<RegisterPage />} />
        <Route path={`/${PROJECT}/:slug`} element={<ProjectPage />} />
        <Route path="all-projects" element={<AllProjectsPage />} /> 
        <Route path={`${PROFILE}/:slug`} element={<ProfilePage />} />
        
        {/* Admin Routes Start */}
        <Route path="/students" element={
          <AdminRoute>
            <StudentTable />
          </AdminRoute>
          } />
        {/* Admin Routes Ends */}
        {/* Student Routes Start */}
        <Route path={`/${STUDENT}/${PROFILE}`} element={
          <StudentRoute>
            <UserPage />
          </StudentRoute>
        }/>
        <Route path={`/${STUDENT}/${UPDATE}/${PROFILE}`} element={
          <StudentRoute>
            <UserUpdatePage />
          </StudentRoute>
        }/>
        {/* Student Routes Ends */}

    </Routes>
  );
}

export default App;
