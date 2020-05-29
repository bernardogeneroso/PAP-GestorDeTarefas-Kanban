<?php
	if (isset($_POST['update']) && $_POST['update'] == 1) {
        session_start();
        
        if($_SESSION['user_board_perms'][3] == 1){
            include_once('../bd/bd.php');
        
            //$iduser = $_SESSION['user_id'];
            $idboard = $_SESSION['user_board'];
            $permorder = $_POST['permorder'];
            $position = $_POST['position'];
            $index = $_POST['index'];
            $op = $_POST['op'];

            $conn->query("UPDATE boardpermissoes SET boardop".$position."='$op' WHERE id='$index' AND permORder='$permorder' AND id_boarduser='$idboard'");
            echo 1;
        } else {
            echo 0;
        }
    } else {
    	header('location: ../assets/logout.php');
    }
?>