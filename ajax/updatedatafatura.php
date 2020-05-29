<?php
	if(isset($_POST['update']) && $_POST['update'] == 1){
		  session_start();

		  include_once('../bd/bd.php');

      if($_SESSION['user_board_perms'][9] == 1){
        $iduser = $_SESSION['user_id'];
        $idboard = $_SESSION['user_board'];
        $idboarduser = $_POST['idboardatual'];
        $fatura = $_POST['fatura'];

        $conn->query("UPDATE board SET fatura='$fatura' WHERE id='$idboarduser' AND id_board='$idboard'");
        echo 1;
      } else {
        echo 0;
      }
        
    } else {
		header('location: ../assets/logout.php');
	}
?>