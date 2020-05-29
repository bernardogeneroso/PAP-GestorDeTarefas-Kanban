<?php
	if(isset($_POST['editboardset']) && $_POST['editboardset'] == 1){
		session_start();

		include_once('../bd/bd.php');

		$array = [];
		$arrayInBoard = [];
		$arrayNoBoard = [];
		$id = $_POST['Id'];
		$iduser = $_SESSION['user_id'];

		//$sql = "SELECT nomeboard, cor, imagem FROM boarduser WHERE id_boarduser = '$id'";
		$sql = "SELECT nomeboard, cor FROM boarduser WHERE id_boarduser = '$id'";
		$result=mysqli_query($conn,$sql);

		if($row_cnt = $result->num_rows){
            while($row=mysqli_fetch_row($result)){
                $nomeboard = $row[0];
                $cor = $row[1];
			}
			
			$sql = "SELECT B.user_username FROM boardusers AS A, login_users AS B WHERE A.id_board = '$id' AND A.id_user = B.user_id AND A.id_user <> '$iduser'";
			$result=mysqli_query($conn,$sql);

			if($row_cnt = $result->num_rows){
				while($row=mysqli_fetch_row($result)){
					array_push($arrayInBoard, $row[0]);
				}
			}

			$sql = "SELECT B.user_username, B.user_email, B.user_imageurl, B.user_id FROM listadeamigos AS A, login_users AS B WHERE A.id_userprinc = '$iduser' AND A.id_userfriend = B.user_id AND A.friend = 1";
			$result=mysqli_query($conn,$sql);

			if($row_cnt = $result->num_rows){
				while($row=mysqli_fetch_row($result)){
					array_push($arrayNoBoard, [$row[0], $row[1], $row[2], $row[3]]);
				}
					
			}
            $send = array($nomeboard, $cor, $arrayInBoard, $arrayNoBoard);
			echo json_encode($send);
        }else { //se não apresenta só esta menssagem
			echo 'ERROR!';
		}

	} else {
		header('location: ../assets/logout.php');
	}
?>