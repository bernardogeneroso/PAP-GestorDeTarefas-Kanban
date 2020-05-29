<?php
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();

    include_once('../bd/bd.php');
    
      if($_SESSION['user_board_perms'][9] == 1){
          $iduser = $_SESSION['user_id'];
          $idboard = $_SESSION['user_board'];
          $idboarduser = $_POST['editboard'];
          $despesas = $_POST['despesas'];
          $lucro = $_POST['lucro'];

          $conn->query("UPDATE board SET lucro='$lucro', despesas='$despesas' WHERE id='$idboarduser' AND id_board='$idboard'");
          echo 1;
      } else {
          echo 0;
      }
    } else {
		header('location: ../assets/logout.php');
	}
?>