// On cré le token et le stock dans le localStorage (zone de stockage du navigateur qui se rappel du token meme si tu coupe le navigateur).
let saveToken = (token) => {
    localStorage.setItem('token', token)
}

// On vérifie la présence du token pour savoir si l'utilisateur est identifié:
let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token
}

export const token = {
    saveToken, isLogged
}