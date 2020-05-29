<?php
if (isset($_POST['update']) && $_POST['update'] == 1) {
	session_start();
	include_once('../bd/bd.php');

	if ($_SESSION['user_board_perms'][9] == 1) {
		$idboard = $_SESSION['user_board'];
		$id = $_POST['id'];

		$conn->query("DELETE FROM filesboards WHERE id='$id' AND id_boardgeral='$idboard'");
		echo 1;
	} else {
		echo 0;
	}
} else {
	header('location: ../assets/logout.php');
}
