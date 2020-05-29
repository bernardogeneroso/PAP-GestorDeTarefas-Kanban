<?php
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();

		include_once('../bd/bd.php');

        $iduser = $_SESSION['user_id'];
        $utilizador = $_POST['utilizador'];
        
        $conn->query("UPDATE login_users SET user_username='$utilizador' WHERE user_id='$iduser'");
    } else {
		header('location: ../assets/logout.php');
	}
?>