<?php
	if(isset($_POST['update']) && $_POST['update'] == 1){
		    session_start();

        if($_SESSION['user_board_perms'][9] == 1){
          include_once('../bd/bd.php');

          $idboard = $_SESSION['user_board'];
          $idtarefa = $_SESSION['user_tarefatual'];
          
          $conn->query("UPDATE board SET dataEncerramento = '' WHERE id='$idtarefa' AND id_board='$idboard'");
          echo 1;
        } else {
          echo 0;
        }
    } else {
		header('location: ../assets/logout.php');
	}
?>