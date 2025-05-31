// // Gére l'inscription des utilisateurs en interceptant la soumission d'un formulaire, en collectant les données saisies, et en les envoyant au serveur.

// document.addEventListener('DOMContentLoaded', () => { // Ecouteur d'évènement qui une fois le document HTML chargé exécutera le code suivant.
//     const form = document.getElementById('signupForm'); // Cherche le form d'inscription par son id.

//     form.addEventListener('submit', async (event) => { // Ecouteur dévènement qui surveil la soumission du form.
//         event.preventDefault(); // Empêche le comportement par défaut du formulaire qui est de soumettre celui ci.

//         // Crée un objet formData qui contient les valeurs saisies dans les différents champs de formulaire (lélectionné grâce à leur id).
//         const formData = {
//             firstname: document.getElementById('firstname').value,
//             lastname: document.getElementById('lastname').value,
//             address: document.getElementById('address').value,
//             city: document.getElementById('city').value,
//             postalCode: document.getElementById('postalCode').value,
//             phone: document.getElementById('phone').value,
//             email: document.getElementById('mailInscription').value,
//             password: document.getElementById('passwordInscription').value,
//         };

//         // Envoie des données au serveur grâce à fetch:
//         try {
//             const response = await fetch('/signup', {
//                 method: 'POST', // Méthode qui donne les infos au server.
//                 headers: {
//                     'Content-Type': 'application/json' // Permet de définir des en-têtes HTTP qui fournissent des informations supplémentaires au serveur sur la nature de la requête.
//                 },
//                 body: JSON.stringify(formData) // Spécifie le type de contenu des données envoyées dans le corps de la requête.
//             });

//             if (response.ok) {
//                 const result = await response.json();
//                 // Console.log en dev seulement
//                 if (process.env.NODE_ENV !== 'production') {
//                     console.log('Données du formulaire :', formData);
//                     console.log('Réponse du serveur :', result);
//                 }
//                 // Affiche un message puis redirige vers une autre page:
//                 alert(result.message);
//                 form.reset(); // Permet de vider le form après son utilisation
//                 window.location.href = '/'; // Redirection vers la page souhaitée, ici la page d'accueil.
//             } else {
//                 // Gère les erreurs qui pourraient venir du server:
//                 const error = await response.json();
//                 console.error('Erreur du serveur :', error);
//                 alert('Erreur lors de l\'inscription : ' + error.message);
//             }
//             // Gère les erreurs qui pourraient venir duréseau ou autres comme les routes:
//         } catch (err) {
//             console.error('Erreur réseau :', err);
//             alert('Erreur réseau : ' + err.message);
//         }
//     });
// });
