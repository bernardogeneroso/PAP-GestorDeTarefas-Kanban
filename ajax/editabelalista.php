<?php 
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();

		if($_SESSION['user_board_perms'][13] == 1){
			include_once('../bd/bd.php');

			$id = $_SESSION['user_id'];
			$idboard = $_SESSION['user_board'];
			$index = $_POST['index'];
			$nomeTarefa =  $_POST['nomeTarefa'];
			$descricao =  $_POST['descricao'];
			$dataVencimento =  $_POST['dataVencimento'];
			$tempoEstimado =  $_POST['tempoEstimado'];
			$cor =  $_POST['cor'];
			$boardatribuida =  $_POST['boardatribuida'];

			$conn->query("UPDATE listatarefas
					SET nomeTarefa='$nomeTarefa', descricao='$descricao', dataVencimento='$dataVencimento', tempoEstimado='$tempoEstimado', prioridade='$cor', id_boardtarefas='$boardatribuida'
					WHERE id_board = '$idboard' AND id_listatarefas = '$index'");
			echo 1;
		} else {
			echo 0;
		}	
	} else {
		header('location: ../assets/logout.php');
	}
?>