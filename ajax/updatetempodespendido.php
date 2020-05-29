<?php
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();

		include_once('../bd/bd.php');

        $iduser = $_SESSION['user_id'];
        $idboard = $_SESSION['user_board'];
        $tempoDespendindo = $_POST['tempoDespendindo'];
        $editBoardID = $_POST['editBoardID'];

        $conn->query("UPDATE board SET tempoDespendido='$tempoDespendindo' WHERE id='$editBoardID' AND id_board='$idboard'");
    } else {
		header('location: ../assets/logout.php');
	}
?>