<?php
// select.php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['id_color'])) {
    $selectedId = $_POST['id_color'];

    // Effectuez une requête SQL pour récupérer les couleurs en fonction de l'ID sélectionné
    include 'connect.php';  // Assurez-vous que le fichier connect.php est inclus

    $sql = "SELECT * FROM color WHERE id_color = :id";
    $stmt = $db->prepare($sql);
    $stmt->bindParam(':id', $selectedId, PDO::PARAM_INT);
    $stmt->execute();

    if ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        // Générez le style en fonction des valeurs récupérées
        $selectedStyle = "
            body {
                background-color: {$row['background_color']};
            }

            .styledDiv, .div_test {
                border-color: {$row['div_color']};
                color: {$row['text_color']};
            }
        ";

        echo $selectedStyle;
    } else {
        // Gestion d'erreur si l'ID n'est pas trouvé
        echo "Erreur lors de la sélection : ID non trouvé.";
    }
} else {
    // Gestion d'erreur si les données ne sont pas valides
    echo "Erreur lors de la sélection : données non valides.";
}
