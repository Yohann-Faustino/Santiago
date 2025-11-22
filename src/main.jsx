// Point d'entrée JavaScript de l'application (étape 3: App.jsx).

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'


ReactDOM.createRoot(document.getElementById('root')).render( // Crée une nouvelle racine Réact en sélectionnant l'élément du DOM avec l'id root.
  // Il faut encapsuler App avec strictMode pour qu'il active des vérifications et des avertissements supplémentaires pour ses descendants afin de faciliter la détection des problèmes de performances et de pratiques non recommandées.
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
