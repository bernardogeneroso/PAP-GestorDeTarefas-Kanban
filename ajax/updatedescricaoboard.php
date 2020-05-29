<?php
	if(isset($_POST['update']) && $_POST['update'] == 1){
		    session_start();

        if($_SESSION['user_board_perms'][9] == 1){
          include_once('../bd/bd.php');

          $idboard = $_SESSION['user_board'];
          $idboarduser = $_POST['editboard'];
          $descricao = $_POST['descricao'];
          $conn->query("UPDATE board SET descricao='$descricao' WHERE id='$idboarduser' AND id_board='$idboard'");

          echo 1;
        } else {
          echo 0;
        }
      } else {
		    header('location: ../assets/logout.php');
	}
?>