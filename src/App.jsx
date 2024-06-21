import {RouterProvider, createBrowserRouter} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Contact from "./pages/Contact";
import LegalDisclaimer from "./pages/LegalDisclaimer";
import SiteMap from "./pages/SiteMap";
import Services from "./pages/Service";
import Planning from "./pages/Planning";
import AdminBoard from "./pages/AdminBoard";
import Error from "./pages/Error";
import Profile from "./pages/Profile";
import Comment from "./pages/Comment";
import Appointments from "./pages/Appointments";
import './styles.css';

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
    path: '/comments',
    element: < Comment/>
  },
  {
    path: '/appointments',
    element: < Appointments/>
  }
])


function App() {

  return (
  <RouterProvider router={monRouter}/>
  )
}

export default App;
