<?php
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();

		include_once('../bd/bd.php');

        $iduser = $_SESSION['user_id'];
        $dois = $_POST['dois'];
        $tres = $_POST['tres'];

        if($dois == $tres){
            $tres = hash("sha512", $tres);
            $conn->query("UPDATE login_users SET user_password='$tres' WHERE user_id='$iduser'");
            echo 'DONE';
        }  else {
            echo 'ERRO';
        }
    } else {
		header('location: ../assets/logout.php');
	}
?>