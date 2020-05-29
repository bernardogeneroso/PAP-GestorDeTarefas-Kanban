<?php
	if(isset($_POST['update']) && $_POST['update'] == 1){
		  session_start();

      if($_SESSION['user_board_perms'][9] == 1){
        include_once('../bd/bd.php');

        //$iduser = $_SESSION['user_id'];
        $idboard = $_SESSION['user_board'];
        $idtarefa = $_SESSION['user_tarefatual'];
        $iduser = $_POST['atribuido'];
        
        $conn->query("INSERT INTO boardprofileassociacao (id, id_board, id_boarduser, id_user) 
                        VALUES (NULL, '$idtarefa', '$idboard', '$iduser')");
        echo 1;
      } else {
        echo 0;
      }
    } else {
		  header('location: ../assets/logout.php');
	}
?>