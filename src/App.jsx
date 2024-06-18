import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Home from "./pages/HomePage/Home";
import SignUp from "./pages/SignUpPage/SignUp";
import Contact from "./pages/ContactPage/Contact";
import LegalDisclaimer from "./pages/LegalDisclaimerPage/LegalDisclaimer";
import SiteMap from "./pages/SiteMapPage/SiteMap";
import Services from "./pages/ServicePage/Service";
import Planning from "./pages/PlanningPage/Planning";
import AdminBoard from "./pages/AdminBoardPage/AdminBoard";
import Error from "./pages/ErrorPage/Error";
import Profile from "./pages/ProfilePage/Profile";
import Comment from "./pages/CommentPage/Comment";


// On cree une constante monRouter dans laquel on definis les routes de chaques pages.
const monRouter = createBrowserRouter([
  {
    path: '/',
    element: < Home/>
  },
  {
    path: '/signup',
    element: < SignUp/>
  },
  {
    path: '/contact',
    element: < Contact/>
  },
  {
    path: '/legalDisclaimer',
    element: < LegalDisclaimer/>
  },
  {
    path: '/siteMap',
    element: < SiteMap/>
  },
  {
    path: '/prestations',
    element: < Services/>
  },
  {
    path: '/planning',
    element: < Planning/>
  },
  {
    path: '/adminBoard',
    element: < AdminBoard/>
  },
  {
    path: '/404',
    element: < Error/>
  },
  {
    path: '/profil',
    element: < Profile/>
  },
  {
    path: '/commenter',
    element: < Comment/>
  }
])


function App() {

  return (
  <RouterProvider router={monRouter}/>
  )
}

export default App;
