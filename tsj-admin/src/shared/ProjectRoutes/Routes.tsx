import { Routes, Route } from "react-router-dom";
import { NoMatch } from "../../pages/NoMatch";
import PasswordRecovery from "../../pages/PasswordRecovery"
import SiteLayout from "../Layout";
import { PROJECT_NAME } from "../../constants/main";
import Login from "../../pages/Login";
// import { PrivateRouteGuestPage } from "../../hoc/PrivateRoute";
import Admin from "../../pages/Admin";



export const ProjectRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<SiteLayout header={<span className="project-place">{PROJECT_NAME}</span>} />}>
        <Route index element={<Login />} />
        {/*<Route element={<PrivateRouteGuestPage />}>*/}
        {/*  <Route path="user">*/}
            <Route path='admin' element={<Admin />}> </Route>
          {/*</Route>*/}
          <Route path="*" element={<NoMatch />} />
          <Route path="passrecovery" element={<PasswordRecovery />} />
        </Route>
      {/*</Route>*/}
    </Routes >
  )
}



