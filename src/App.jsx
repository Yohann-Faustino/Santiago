import {RouterProvider, createBrowserRouter} from "react-router-dom";
import './App.css'
import Accueil from "./Accueil";
import Signup from "./SignUp";
import Contact from "./Contact";
import LegalDisclaimer from "./legalDisclaimer";
import SiteMap from "./SiteMap";
import Prestations from "./Prestations";
import Planning from "./Planning";
import AdminBoard from "./AdminBoard";
import Error from "./Error";
import Profil from "./Profil";
import Commenter from "./Commenter";

// On cree une constante monRouter dans laquel on definis les routes de chaques pages.
const monRouter = createBrowserRouter([
  {
    path: '/',
    element: < Accueil/>
  },
  {
    path: '/signup',
    element: < Signup/>
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
    element: < Prestations/>
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
    element: < Profil/>
  },
  {
    path: '/commenter',
    element: < Commenter/>
  }
])


function App() {

  return <RouterProvider router={monRouter}/>
}

export default App;
