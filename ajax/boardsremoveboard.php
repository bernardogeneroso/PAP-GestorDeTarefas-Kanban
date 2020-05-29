<?php 
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();

		if($_SESSION['user_board_perms'][10] == 1){
			include_once('../bd/bd.php');

			$idboard = $_SESSION['user_board'];
			$lengthMax = $_POST['lengthMax'];
			$categoria = $_POST['categoria'];
			$idBoard = $_POST['idBoard'];
			$idColuna = $_POST['id'];


			$sql = "DELETE FROM board WHERE id='$idBoard' AND id_board='$idboard'";

			if ($conn->query($sql) === TRUE) {
				if(!empty($_POST['positions'])){
					foreach($_POST['positions'] as $position) {
						$id = $position[0];
						$newPosition = $position[1];

						$conn->query("UPDATE board SET id_position = '$newPosition', id_categoria='$idColuna' WHERE id='$id' AND id_board='$idboard'");
					}
				}
				$conn->query("UPDATE boardcategoria SET countBoard = '$lengthMax' WHERE id='$idColuna' AND id_boarduser='$idboard'");
			}
			echo 1;
		} else {
			echo 0;
		}
	} else {
		header('location: ../assets/logout.php');
	}
?>