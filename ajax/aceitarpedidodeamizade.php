<?php
	if(isset($_POST['update']) && $_POST['update'] == 1){
		session_start();

		include_once('../bd/bd.php');

        $iduser = $_SESSION['user_id'];
        $id = $_POST['id'];

        $conn->query("UPDATE listadeamigos SET pedamistatus = 0, friend=1 WHERE id_userprinc='$iduser' AND id_userfriend='$id'");
        $conn->query("UPDATE listadeamigos SET friend=1 WHERE id_userprinc='$id' AND id_userfriend='$iduser'");
    
        
	    if($_SESSION['estado_darkmode'] = 1){
            $darkmode = 'darkmode';
        }else {
            $darkmode = '';
        }

        echo $darkmode;
    } else {
		header('location: ../assets/logout.php');
	}
?>