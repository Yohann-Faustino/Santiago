// signup.js

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('signupForm');

    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Empêche le comportement par défaut du formulaire

        const formData = {
            firstname: document.getElementById('firstname').value,
            lastname: document.getElementById('lastname').value,
            address: document.getElementById('address').value,
            phone: document.getElementById('phone').value,
            email: document.getElementById('mailInscription').value,
            password: document.getElementById('passwordInscription').value,
        };

        console.log('Données du formulaire :', formData);

        // Envoie des données au serveur
        try {
            const response = await fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                const result = await response.json();
                console.log('Réponse du serveur :', result);
                // Affiche un message ou redirige vers une autre page
                alert(result.message);
                window.location.href = '/'; // Par exemple, redirection vers la page d'accueil
            } else {
                const error = await response.json();
                console.error('Erreur du serveur :', error);
                alert('Erreur lors de l\'inscription : ' + error.message);
            }
        } catch (err) {
            console.error('Erreur réseau :', err);
            alert('Erreur réseau : ' + err.message);
        }
    });
});
