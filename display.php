<?php



include 'connect.php';

// Insertion des données si le formulaire est soumis
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Vérifiez si les valeurs nécessaires sont présentes dans $_POST
    if (isset($_POST['bgColor'], $_POST['borderColor'], $_POST['textColor'])) {
        $bgColor = $_POST['bgColor'];
        $borderColor = $_POST['borderColor'];
        $textColor = $_POST['textColor'];

        // Votre requête SQL INSERT
        $sql = "INSERT INTO color (background_color, div_color, text_color) 
                VALUES ('$bgColor', '$borderColor', '$textColor')";

        // Exécution de la requête
        if ($db->query($sql) === TRUE) {
            echo "Les données ont été ajoutées avec succès à la base de données.";
        } else {
            echo "" . $db->errorInfo()[2];
        }
    } else {
        echo "Veuillez remplir tous les champs du formulaire.";
    }
}


// Récupération des données depuis la base de données
$sql = "SELECT * FROM color";
$result = $db->query($sql);

if ($result) {
    $rows = $result->fetchAll(PDO::FETCH_ASSOC);

    // Affichage des résultats avec une seule div
    echo "<h2 class='styledDiv' class=>Résultats de la base de données :</h2>";
    foreach ($rows as $row) {
        $id_color = $row['id_color'];
        echo '<div id="result"' . $id_color . '" class="result-item" style="background-color: ' . $row['background_color'] . '; border: 3px solid ' . $row['div_color'] . '; color: ' . $row['text_color'] . '; width: 12.5em; height: 5em; text-align: center; padding: 10px; margin-bottom:20px;"><p>Coucou</p>';
        echo '<button class="select-button" onclick="selectResult(' . $id_color . ')">Sélectionner</button></div>';
        echo '<br>';
    }
} else {
    echo "Erreur lors de la récupération des données : " . $db->errorInfo()[2];
}
