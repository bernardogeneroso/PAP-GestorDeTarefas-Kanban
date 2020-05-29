<?php 
	session_start();

	if(isset($_POST['editarPassword']) && $_POST['editarPassword'] == 1){
		include_once('../bd/bd.php');

		$id = $_SESSION['user_id'];
		$passwordpop = $_POST['passwordpopPHP'];
		$passwordpopconfirm = $_POST['passwordpopconfirmPHP'];

		$length_password = strlen($passwordpop);
		$length_passwordconfirm = strlen($passwordpopconfirm);

		if($passwordpop == '' || $passwordpopconfirm == ''){
			echo 'Verifique os campos';
		} else if($length_password <= 5){
			echo 'É preciso ter mais de 6 caracteres';
		} else if($passwordpop != $passwordpopconfirm){
			echo 'As palavra-passes são diferentes';
		} else {
			$passwordpop = hash("sha512", $_POST['passwordpopPHP']);

			$sql = "UPDATE login_users
				SET user_password = '$passwordpop'
				WHERE user_id = '$id'";

			$update = mysqli_query($conn, $sql) or die(mysqli_error($conn));

			if(mysqli_affected_rows($conn) == 1){ //ifnum
	        	echo('Alteração bem sucedida!');
		    }
		    else{
		        echo('Error!');
		    }
		}
	} else {
		header('location: ../assets/logout.php');
	}
?>