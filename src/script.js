// Récupérer les éléments DOM
const infoContainer = document.getElementById('info-container');
const infoHandler = document.getElementById('info-handler');

// Afficher les infos quand targetIndex: 1 est détecté
infoHandler.addEventListener('targetFound', () => {
    infoContainer.style.display = 'block';
});

// Cacher les infos quand targetIndex: 1 est perdu
infoHandler.addEventListener('targetLost', () => {
    infoContainer.style.display = 'none';
});