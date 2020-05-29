<?php 
	if(isset($_POST['deltabelaset']) && $_POST['deltabelaset'] == 1){
		session_start();

		if($_SESSION['user_board_perms'][14] == 1){
			include_once('../bd/bd.php');

			$idboard = $_SESSION['user_board'];
			$index = $_POST['index'];

			$conn->query("DELETE FROM listatarefas WHERE id_board='$idboard' AND id_listatarefas = '$index'");

			if(!empty($_POST['positions'])){
				foreach($_POST['positions'] as $position) {
					$id = $position[0];
					$newPosition = $position[1];

					$conn->query("UPDATE listatarefas SET position = '$newPosition' WHERE id_listatarefas='$id' AND id_board='$idboard'");
				}
			}
			echo 1;
		} else {
			echo 0;
		}
	} else {
		header('location: ../assets/logout.php');
	}
?>