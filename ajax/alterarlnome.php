<?php
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();

		include_once('../bd/bd.php');

        $iduser = $_SESSION['user_id'];
        $lname = $_POST['lname'];
        
        $conn->query("UPDATE login_users SET user_lname='$lname' WHERE user_id='$iduser'");
    } else {
		header('location: ../assets/logout.php');
	}
?>