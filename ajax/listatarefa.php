<?php
	if (isset($_POST['update']) && $_POST['update'] == 1) {
        session_start();
		include_once('../bd/bd.php');

        if($_SESSION['user_board_perms'][15] == 1){
            foreach($_POST['positions'] as $position) {
            $index = $position[0];
            $newPosition = $position[1];

            $conn->query("UPDATE listatarefas SET position = '$newPosition' WHERE id_listatarefas='$index'");
            }
            echo 1;
        } else {
            echo 0;
        }
    } else {
    	header('location: ../assets/logout.php');
    }
?>