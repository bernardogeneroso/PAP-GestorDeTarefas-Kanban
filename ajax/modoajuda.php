<?php
	if(isset($_POST['modoAjudaPHP']) && $_POST['modoAjudaPHP'] == 1){
		session_start();

		$ajuda = $_POST['ajuda'];

		if($ajuda == 1){
			$_SESSION['estado_modoajuda'] = 1;
		} else {
			$_SESSION['estado_modoajuda'] = 0;
		}
	} else {
		header('location: ../assets/logout.php');
	}
?>