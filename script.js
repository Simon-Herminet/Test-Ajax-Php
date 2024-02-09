
document.addEventListener('DOMContentLoaded', function () {
    var styleRules = document.getElementById('styleRules');
    var valider = document.getElementById('valider');
    var resultsContainer = document.getElementById('results');

    // Fetch initial results if the results container is empty
    if (resultsContainer.innerHTML === '') {
        fetchInitialResults();
    }

    // Ajouter un gestionnaire d'événements pour écouter les clics sur les éléments enfants de resultsContainer
    resultsContainer.addEventListener('click', function (event) {
        var selectedElement = event.target;

        // Vérifier si l'élément cliqué a la classe 'result-item'
        if (selectedElement.classList.contains('result-item')) {
            // Mettre à jour le style de la page en fonction des couleurs de l'élément sélectionné
            var bgColor = selectedElement.style.backgroundColor;
            var borderColor = selectedElement.style.borderColor;
            var textColor = selectedElement.style.color;

            styleRules.innerHTML = `
                body {
                    background-color: ${bgColor};
                }

                .styledDiv, .div_test {
                    border-color: ${borderColor};
                    color: ${textColor};
                }
            `;
        }
    });

    valider.addEventListener('click', function () {
        var bgColor = document.getElementById('bgColor').value;
        var borderColor = document.getElementById('borderColor').value;
        var textColor = document.getElementById('textColor').value;

        // Création d'une requête XMLHttpRequest
        var xhr = new XMLHttpRequest();
        var url = 'display.php';

        // Définition de la méthode POST et de l'URL
        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

        // Gestionnaire d'événement de chargement
        xhr.onload = function () {
            if (xhr.status === 200) {
                // Créer un élément div pour chaque résultat
                var newResults = document.createElement('div');
                newResults.innerHTML = xhr.responseText;

                // Ajouter les nouveaux résultats
                resultsContainer.innerHTML = '';
                resultsContainer.appendChild(newResults);

                console.log('Les données ont été envoyées avec succès.');
            } else {
                console.log("Erreur lors de l'envoi des données : " + xhr.statusText);
            }
        };

        // Gestionnaire d'événement d'erreur
        xhr.onerror = function () {
            console.log('Erreur lors de la requête.');
        };

        // Envoi des données au serveur
        xhr.send('bgColor=' + bgColor + '&borderColor=' + borderColor + '&textColor=' + textColor);
    });
});

function fetchInitialResults() {
    var xhr = new XMLHttpRequest();
    var url = 'display.php';

    // Définition de la méthode GET et de l'URL
    xhr.open('GET', url, true);

    // Gestionnaire d'événement de chargement
    xhr.onload = function () {
        if (xhr.status === 200) {
            // Créer un élément div pour chaque résultat
            var newResults = document.createElement('container');
            newResults.innerHTML = xhr.responseText;

            // Ajouter les nouveaux résultats
            var resultsContainer = document.getElementById('results');
            resultsContainer.appendChild(newResults);
        } else {
            console.log("Erreur lors de la récupération des données initiales : " + xhr.statusText);
        }
    };

    // Gestionnaire d'événement d'erreur
    xhr.onerror = function () {
        console.log('Erreur lors de la requête pour les résultats initiaux.');
    };

    // Envoi de la requête
    xhr.send();
}

