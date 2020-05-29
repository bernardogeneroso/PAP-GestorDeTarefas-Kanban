<?php
	if (isset($_POST['update']) && $_POST['update'] == 1) {
        session_start();
        
        if($_SESSION['user_board_perms'][2] == 1){
            include_once('../bd/bd.php');
        
            //$iduser = $_SESSION['user_id'];
            $idboard = $_SESSION['user_board'];
            $orderpem = $_POST['orderpem'];
            $index = $_POST['index'];
            $id = $_POST['id'];
            $conn->query("DELETE FROM boardpermissoesusers WHERE id='$index' AND id_boardpermissiao='$orderpem' AND id_boarduser='$idboard' AND id_user='$id'");
            $conn->query("DELETE FROM boardusers WHERE id_board='$idboard' AND id_user='$id'");
            $conn->query("DELETE FROM boardgestorsalario WHERE id_boarduser='$idboard' AND id_user='$id'");
            $conn->query("DELETE FROM boardprofileassociacao WHERE id_boarduser='$idboard' AND id_user='$id'");
            echo 1;
        } else {
            echo 0;
        }
    } else {
    	header('location: ../assets/logout.php');
    }
?>