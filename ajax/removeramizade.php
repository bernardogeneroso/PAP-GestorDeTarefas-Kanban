<?php 
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();

		include_once('../bd/bd.php');

		$id = $_SESSION['user_id'];
		$idfriend = $_POST['index'];

		$sql = "DELETE FROM listadeamigos WHERE id_userprinc = '$id' AND id_userfriend = '$idfriend'";

		if ($conn->query($sql) === TRUE) {
            $sql = "DELETE FROM listadeamigos WHERE id_userprinc = '$idfriend' AND id_userfriend = '$id'";
            if ($conn->query($sql) === TRUE) {
                echo 'SUCCESS';
            } else {
                echo 'ERROR';
            }            
		} else {
		    echo 'ERROR';
		}

	} else {
		header('location: ../assets/logout.php');
	}
?>