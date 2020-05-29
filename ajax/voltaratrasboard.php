<?php
	if (isset($_POST['update']) && $_POST['update'] == 1) {
        session_start();

        $_SESSION['estado_boardsettings'] = 1;
		$_SESSION['estado_boardclick'] = 0;
        unset($_SESSION['user_board']);
        
        echo 'boardsettings';
    } else {
    	header('location: ../assets/logout.php');
    }
?>