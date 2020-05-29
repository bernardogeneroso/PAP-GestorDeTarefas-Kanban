<?php
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();

		include_once('../bd/bd.php');

        $iduser = $_SESSION['user_id'];
        $id = $_POST['id'];

        $conn->query("DELETE FROM listadeamigos WHERE id_userprinc = '$iduser' AND id_userfriend = '$id'");
        $conn->query("DELETE FROM listadeamigos WHERE id_userprinc = '$id' AND id_userfriend = '$iduser'");
    } else {
		header('location: ../assets/logout.php');
	}
?>