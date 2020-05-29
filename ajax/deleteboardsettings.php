<?php 
	if(isset($_POST['delboardset']) && $_POST['delboardset'] == 1){
		session_start();

		include_once('../bd/bd.php');

		$id = $_SESSION['user_id'];
		$idboard = $_POST['Id'];

		$conn->query("DELETE FROM boarduser WHERE id_boarduser='$idboard' AND id_user='$id'");
		$conn->query("DELETE FROM boardusers WHERE id_board='$idboard'");
	} else {
		header('location: ../assets/logout.php');
	}
?>