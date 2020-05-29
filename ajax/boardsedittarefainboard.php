<?php 
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();

		if($_SESSION['user_board_perms'][9] == 1){
			include_once('../bd/bd.php');

			$idboard = $_SESSION['user_board'];
			$idcomment = $_POST['idcomment'];
			$comment = $_POST['comment'];

			$conn->query("UPDATE listatarefas SET nomeTarefa = '$comment' WHERE id_listatarefas='$idcomment' AND id_board='$idboard'");
			echo 1;
		} else {
			echo 0;
		}
	} else {
		header('location: ../assets/logout.php');
	}
?>