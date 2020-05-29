<?php 
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();

		if($_SESSION['user_board_perms'][13] == 1){
			include_once('../bd/bd.php');

			$iduser = $_SESSION['user_id'];
			$idboard = $_SESSION['user_board'];
			$index = $_POST['index'];

			$arraylista = [];
			$arrayboardtarefas = [];

			$sql = "SELECT A.nomeTarefa, A.descricao, A.dataVencimento, A.tempoEstimado, A.prioridade, B.user_username, A.id_boardtarefas FROM listatarefas AS A, login_users AS B WHERE A.id_listatarefas = '$index' AND A.id_board = '$idboard' AND A.id_user = B.user_id";
			$result=mysqli_query($conn,$sql);

			if($row_cnt = $result->num_rows){
				while($row=mysqli_fetch_row($result)){
					array_push($arraylista, [$row[0], $row[1], $row[2], $row[3], $row[4], $row[5], $row[6]]);
				}

				$sql = "SELECT A.nomeboard, B.nomeCategoria, A.id FROM board AS A, boardcategoria AS B WHERE A.id_board = '$idboard' AND A.id_categoria = B.id";
				$result=mysqli_query($conn,$sql);
				if($row_cnt = $result->num_rows){
					while($row=mysqli_fetch_row($result)){
						array_push($arrayboardtarefas, [$row[0], $row[1], $row[2]]);
					}
				}

				$origem = array($arraylista, $arrayboardtarefas);
				echo json_encode($origem);
			}
		} else {
			$origem = array(0);
			echo json_encode($origem);
		}
	} else {
		header('location: ../assets/logout.php');
	}
?>