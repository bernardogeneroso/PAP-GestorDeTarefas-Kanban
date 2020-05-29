<?php 
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();
		include_once('../bd/bd.php');

		$id = $_SESSION['user_id'];
		$color = $_POST['boardcolor'];
		$nome = $_POST['boardnome'];

		$conn->query("INSERT INTO boarduser (id_boarduser, id_user, nomeboard, cor)
		VALUES ('', '$id', '$nome', '$color')");

		$sql = "SELECT id_boarduser FROM boarduser WHERE id_user='$id' ORDER BY id_boarduser DESC LIMIT 1";
		$result=mysqli_query($conn,$sql);
		if($row_cnt = $result->num_rows){
			while($row=mysqli_fetch_row($result)){
				$boarduser = $row[0];
			}

			$conn->query("INSERT INTO boardpermissoes (id, id_boarduser, id_user, permORder, nomeperm, boardop1, boardop2, boardop3, boardop4, boardop5, boardop6, boardop7, boardop8, boardop9, boardop10, boardop11, boardop12, boardop13, boardop14, boardop15, boardop16, boardop17) 
						VALUES (NULL, '$boarduser', '$id', '1', 'Admin', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1', '1')");
			$adminID = $conn->insert_id;
			$conn->query("INSERT INTO boardpermissoes (id, id_boarduser, id_user, permORder, nomeperm, boardop1, boardop2, boardop3, boardop4, boardop5, boardop6, boardop7, boardop8, boardop9, boardop10, boardop11, boardop12, boardop13, boardop14, boardop15, boardop16, boardop17) 
						VALUES (NULL, '$boarduser', '$id', '2', 'Membro', '0', '1', '0', '0', '1', '1', '1', '0', '1', '1', '0', '1', '1', '1', '0', '1', '0');");
			$membroID = $conn->insert_id;
			$conn->query("INSERT INTO boardpermissoesusers (id, id_boarduser, id_boardpermissiao, id_user) 
						VALUES (NULL, '$boarduser', '$adminID', '$id');");
			

			if(!empty($_POST['friendAssociateBoard'])){
				foreach($_POST['friendAssociateBoard'] as $friend){
					$idFriend = $friend;
					$conn->query("INSERT INTO `boardpermissoesusers` (`id`, `id_boarduser`, `id_boardpermissiao`, `id_user`) VALUES (NULL, '$boarduser', '$membroID', '$idFriend');");
					$conn->query("INSERT INTO boardusers (id, id_board, id_user) VALUES ('', '$boarduser', '$idFriend');");
					$conn->query("INSERT INTO boardgestorsalario (id, id_boarduser, id_user) VALUES (NULL, '$boarduser', '$idFriend');");
				}
			}
			$conn->query("INSERT INTO boardgestorsalario (id, id_boarduser, id_user) VALUES (NULL, '$boarduser', '$id');");
			$conn->query("INSERT INTO boardusers (id, id_board, id_user) VALUES (NULL, '$boarduser', '$id');");
			
			$origem = array($color, $boarduser, $nome);
			echo json_encode($origem);
		}
	} else {
		header('location: ../assets/logout.php');
	}
?>