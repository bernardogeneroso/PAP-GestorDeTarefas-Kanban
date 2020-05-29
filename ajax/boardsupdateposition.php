<?php
	if (isset($_POST['update']) && $_POST['update'] == 1) {
        session_start();

        if($_SESSION['user_board_perms'][11] == 1){
            include_once('../bd/bd.php');
            
            $lengthMax = $_POST['lengthMax'];
            $idboard = $_SESSION['user_board'];
            $categoriaPrincipal = $_POST['categoriaPrincipal'];
            $iduser = $_SESSION['user_id'];

            if(!empty($_POST['positions'])){
                foreach($_POST['positions'] as $position) {
                    $id = $position[0];
                    $newPosition = $position[1];

                    $conn->query("UPDATE board SET id_position = '$newPosition', id_categoria='$categoriaPrincipal' WHERE id='$id' AND id_board='$idboard'");
                }
            }

            
            $conn->query("UPDATE boardcategoria SET countBoard = '$lengthMax' WHERE id='$categoriaPrincipal' AND id_boarduser='$idboard'");
            echo 1;
        } else {
            echo 0;
        }
    } else {
    	header('location: ../assets/logout.php');
    }
?>