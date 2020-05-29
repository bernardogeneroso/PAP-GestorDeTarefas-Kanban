<?php
	if (isset($_POST['update']) && $_POST['update'] == 1) {
        session_start();

        if($_SESSION['user_board_perms'][9] == 1){
            include_once('../bd/bd.php');
            
            $categoria = $_POST['categoria'];
            $idboard = $_SESSION['user_board'];
            $valueSave = $_POST['valueSave'];
            $id = $_POST['id'];

            $conn->query("UPDATE boardcategoria SET nomeCategoria = '$valueSave' WHERE id='$id' AND id_boarduser='$idboard'");
            echo 1;
        } else {
            echo 0;
        }
    } else {
    	header('location: ../assets/logout.php');
    }
?>