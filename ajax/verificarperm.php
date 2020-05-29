<?php 
	if(isset($_POST['update']) && $_POST['update'] == 1){
        session_start();
        
        if($_SESSION['user_board_perms'][$_POST['arrayposition']] == 1){
            echo 1;
        } else {
            echo 0;
        }
	} else {
		header('location: ../assets/logout.php');
	}
?>
