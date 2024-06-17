import {RouterProvider, createBrowserRouter} from "react-router-dom";
import './App.css'

// On cree une constante monRouter dans laquel on definis les routes de chaques pages.
const monRouter = createBrowserRouter([
  {
    path: '/',
    element: <div>Page d'Accueil</div>
  },
  {
    path: '/signup',
    element: <div>Page Connexion</div>
  },
  {
    path: '/contact',
    element: <div>Page Contact</div>
  },
  {
    path: '/legalDisclaimer',
    element: <div>Page Mentions légales</div>
  },
  {
    path: '/siteMap',
    element: <div>Page Plan du site</div>
  },
  {
    path: '/prestations',
    element: <div>Page des Prestations</div>
  },
  {
    path: '/planning',
    element: <div>Page Planning</div>
  },
  {
    path: '/adminBoard',
    element: <div>Page Tableau de bord</div>
  },
  {
    path: '/404',
    element: <div>Page Error</div>
  },
  {
    path: '/profil',
    element: <div>Page Profil</div>
  },
  {
    path: '/commenter',
    element: <div>Page des Commentaires</div>
  }
])


function App() {

  return <RouterProvider router={monRouter}/>
}

export default App;
