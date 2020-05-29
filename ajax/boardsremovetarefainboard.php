<?php
if (isset($_POST['update']) && $_POST['update'] == 1) {
	session_start();
	include_once('../bd/bd.php');
	if ($_SESSION['user_board_perms'][14] == 1) {
		$idboard = $_SESSION['user_board'];
		$idcomment = $_POST['idcomment'];

		$conn->query("DELETE FROM listatarefas WHERE id_board='$idboard' AND id_listatarefas='$idcomment'");

		echo 1;
	} else {
		echo 0;
	}
} else {
	header('location: ../assets/logout.php');
}
