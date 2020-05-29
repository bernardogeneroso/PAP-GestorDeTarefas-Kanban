<?php 
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();
		include_once('../bd/bd.php');

		$id = $_SESSION['user_id'];
		$idBoard = $_POST['idBoard'];
		$nomeBoard = $_POST['nomeBoard'];
		$colorBoard = $_POST['colorBoard'];

		intval($idBoard);

		$conn->query("UPDATE boarduser SET nomeboard = '$nomeBoard', cor = '$colorBoard' WHERE id_boarduser = '$idBoard' AND id_user = '$id'");

		$membroID = 0;
		$sql = "SELECT B.id FROM boardpermissoesusers AS A, boardpermissoes AS B WHERE A.id_boardpermissiao = B.id AND A.id_boarduser = '$idBoard' AND B.permORder = '2'";
		$result=mysqli_query($conn,$sql);
		if($row_cnt = $result->num_rows){
			while($row=mysqli_fetch_row($result)){
				$membroID = $row[0];
			}
		}

		foreach($_POST['friendAssociateBoard'] as $friend){
			$idFriend = $friend[0];
			$ativo = $friend[1];
			$sql = "SELECT id_user FROM boardusers WHERE id_board='$idBoard' AND id_user='$idFriend'";
			$result=mysqli_query($conn,$sql);
			if($row_cnt = $result->num_rows){
				if($ativo != 1){
					$conn->query("DELETE FROM boardusers WHERE id_board='$idBoard' AND id_user='$idFriend'");
					$conn->query("DELETE FROM boardpermissoesusers WHERE id_boarduser='$idBoard' AND id_user='$idFriend'");
					$conn->query("DELETE FROM boardgestorsalario WHERE id_boarduser='$idBoard' AND id_user='$idFriend'");
					$conn->query("DELETE FROM boardprofileassociacao WHERE id_boarduser='$idBoard' AND id_user='$idFriend'");
				}
			} else {
				if($ativo == 1){
					$conn->query("INSERT INTO boardusers (id, id_board, id_user) VALUES ('', $idBoard, $idFriend)");
					$conn->query("INSERT INTO boardpermissoesusers (id, id_boarduser, id_boardpermissiao, id_user) VALUES (NULL, '$idBoard', '$membroID', '$idFriend')");
					$conn->query("INSERT INTO boardgestorsalario (id, id_boarduser, id_user) VALUES (NULL, '$idBoard', '$idFriend');");
				}	
			}
		}
	} else {
		header('location: ../assets/logout.php');
	}
?>