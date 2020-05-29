<?php 
	if(isset($_POST['update']) && $_POST['update'] == 1){
        session_start();
        if($_SESSION['user_board_perms'][10] == 1){
            include_once('../bd/bd.php');

            $idboard = $_SESSION['user_board'];
            $categoria = $_POST['categoria'];
            $id = $_POST['id'];
            $nice = 0;

            $sql = "DELETE FROM boardcategoria WHERE id_boarduser='$idboard' AND id='$id'";
            if ($conn->query($sql) === TRUE) {
            $nice = 1;
            }
            $sql = "DELETE FROM board WHERE id_board='$idboard' AND id_categoria='$categoria'";

            if ($conn->query($sql) === TRUE) {
                if($nice == 1){
                    echo 'SUCCESS';
                }
            }
        } else {
            echo 0;
        }
	} else {
		header('location: ../assets/logout.php');
	}
?>