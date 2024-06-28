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
import Customers from "./pages/Customers";
import './styles.css';
import AuthCheck from "./components/authCheck";
import ProtectedData from "./components/protectedData";

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
    path: '/profile',
    element: < Profile/>
  },
  {
    path: '/comments',
    element: 
    <div>
      <ProtectedData />
      < Comment/>
    </div>
  },
  {
    path: '/appointments',
    element: 
    <div>
      <ProtectedData />
      < Appointments/>
    </div>
  },
  {
    path: '/customers',
    element: 
    <div>
      <ProtectedData />
      < Appointments/>
    </div>
  }
])


function App() {

  return (
    <div>
      <AuthCheck /> {/* Vérifie si l'utulisateur du site a un token pour limiter/autoriser les accès.*/}
      <RouterProvider router={monRouter}/>
    </div>
  )
}

export default App;
