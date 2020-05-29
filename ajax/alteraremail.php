<?php
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();

		include_once('../bd/bd.php');

        $iduser = $_SESSION['user_id'];
        $email = $_POST['email'];
        
        $sql = "UPDATE login_users SET user_email='$email' WHERE user_id='$iduser'";

        if ($conn->query($sql) === TRUE) {
            echo 'DONE';
        } else {
            echo 'ERROR';
        }
        
    } else {
		header('location: ../assets/logout.php');
	}
?>