<?php 
	session_start();

	if(isset($_FILES['file']) && !empty($_FILES['file'])){
		include_once('../bd/bd.php');

		$id = $_SESSION['user_id'];

		$file = $_FILES['file'];

		$fileName = $_FILES['file']['name'];
		$fileTmpName = $_FILES['file']['tmp_name'];
		$fileSize = $_FILES['file']['size'];
		$fileError = $_FILES['file']['error'];
		$fileType = $_FILES['file']['type'];

		$fileExt = explode('.',$fileName);
		$fileActualExt = strtolower(end($fileExt));

		$allowed = array('jpg','jpeg','png');

		$enviarlinkimg = '';

		if(in_array($fileActualExt, $allowed)){
			if ($fileError === 0) {
				if ($fileSize < 500000) { //500000kb = 500mb
					$fileNameNew = uniqid('',true).".".$fileActualExt; 
					$fileDestination = 'C:/Users/Camelo/Documents/xampp/htdocs/pap/img/boardsettings/uploads/profille/'.$fileNameNew;
					$fileDestinationSent = 'img/boardsettings/uploads/profille/'.$fileNameNew;
					move_uploaded_file($fileTmpName, $fileDestination);

					$sql = "UPDATE login_users
						SET user_imageurl = '$fileDestinationSent'
						WHERE user_id = '$id'";

	   				 $update = mysqli_query($conn, $sql) or die(mysqli_error($conn));

					echo json_encode($fileDestinationSent, JSON_UNESCAPED_UNICODE);
				} else {
					$origem = array("1", "A imagem é muito grande!");
					echo json_encode($origem);
				}
			} else {
				$origem = array("1", "Houve um erro no upload da imagem");
				echo json_encode($origem);
			}
		} else {
			$origem = array("1", "Não pode uplodar ficheiros tipo ".$fileActualExt);
			echo json_encode($origem);
		}

	} else {
		header('location: ../assets/logout.php');
	}
?>