// select.js
function selectResult(id_color) {
    console.log("Sélection en cours pour l'ID : " + id_color);

    // Création d'une requête XMLHttpRequest
    var xhr = new XMLHttpRequest();
    var url = 'select.php';

    // Définition de la méthode POST et de l'URL
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    // Gestionnaire d'événement de chargement
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Ajoutez un message de débogage pour voir la réponse
            console.log("Réponse reçue : " + xhr.responseText);

            // Mettre à jour le style de la page avec les résultats de la requête
            styleRules.innerHTML = xhr.responseText;
        } else {
            console.log("Erreur lors de la sélection : " + xhr.statusText);
        }
    };

    // Gestionnaire d'événement d'erreur
    xhr.onerror = function () {
        console.log('Erreur lors de la requête de sélection.');
    };

    // Envoi des données au serveur
    xhr.send('id_color=' + id_color);
}